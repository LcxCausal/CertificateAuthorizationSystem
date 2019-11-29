Forms = {
    web3Provider: null,
    contracts: {},

    initWeb3Provider: function () {
        Forms.web3Provider = window.ethereum;
        Forms.initContract();
    },

    initContract: function () {
        $.getJSON('Commission.json', function (data) {
            var CommissionArtifact = data;
            Forms.contracts.Commission = TruffleContract(CommissionArtifact);

            // Set the provider for our contract
            Forms.contracts.Commission.setProvider(Forms.web3Provider);
        });
    },

    eventsInit: function () {
        Forms.bindClickEntryButtonEvent();
        Forms.bindClickQueryButtonEvent();
    },

    bindClickEntryButtonEvent: function () {
        $(document).on('click', '#entry', Forms.handleClickEntryButton);
    },

    bindClickQueryButtonEvent: function () {
        $(document).on('click', '#search', Forms.handleClickQueryButton);
    },

    handleClickEntryButton: function () {
        Forms.showEntryForms();
    },

    handleClickQueryButton: function () {
        Forms.showQueryForms();
    },

    initEntryForms: function () {
        var entryInfo = $('<div id=\'EntryInfo\'><div>');
        entryInfo.append($('<h2>证书详细信息</h2><label id="certID" for="certID">证书ID:</label><input type="text" id="inputCertID" placeholder="please input cert ID"><label id="winner" for="winner">获奖者地址:</label><input type="text" id="inputWinnerAddress"  placeholder="please input the winner address"><label id="awardAgent" for="awardAgent">颁发机构: </label><select id="selectAwardAgent"><option value="provinceLevelAgent">省级教育部</option><option value="municipalLevelAgent">市级教育部</option><option value="countyLevelAgent">县级教育部</option></select><label id="certLevel" for="certLevel">证书等级: </label><select id="selectCertLevel"><option value="provinceLevel">省级</option><option value="municipalLevel">市级</option><option value="countyLevel">县级</option></select><label id="awardDate" for="awardDate">颁发日期: </label><input type="date" id="chooseAwardDate"><label id="detailInfo" for="detailInfo">详细信息: </label><textarea id="inputDetailInfo" type="text" placeholder="please input cert\'s detail information"></textarea><button id="cancel" type="button">取消</button><button id="commit" type="button">提交</button>'));
        $('body').append(entryInfo);

        Forms.resetSelectAwardAgentValues();
        $('#chooseAwardDate')[0].value = new Date().toISOString().slice(0, 10);

        Forms.bindChangeAgencySelectValueEvent();
        Forms.bindClickCancelButtonEvent();
        Forms.bindClickCommitButtonEvent();
    },

    bindChangeAgencySelectValueEvent: function () {
        $(document).on('change', '#selectAwardAgent', Forms.handleChangeAgencySelectValue);
    },

    handleChangeAgencySelectValue: function () {
        var awardAgent = $('#selectAwardAgent')[0].value;
        Forms.resetSelectCertLevel(awardAgent);
    },

    resetSelectAwardAgentValues: function () {
        var searchConditions = $('#selectAwardAgent')[0];
        searchConditions.options.length = 0;
        Forms.inputSearchConditionsWithAgencies(searchConditions);
    },

    inputSearchConditionsWithAgencies: function (searchConditions) {
        var url = App.serverHost + '/queryCertAgencies';
        $.getJSON(url, function (result) {
            searchConditions.options.length = result.agencies.length;
            for (var i = 0; i < searchConditions.options.length; i++) {
                searchConditions.options[i].value = result.agencies[i].agencyID;
                searchConditions.options[i].text = result.agencies[i].agencyInfo;
            }

            Forms.resetSelectCertLevel(searchConditions.options[0].value);
        })
    },

    resetSelectCertLevel: function (awardAgent) {
        var searchConditions = $('#selectCertLevel')[0];
        searchConditions.options.length = 0;
        Forms.inputSearchConditionsWithCertLevels(searchConditions, awardAgent);
    },

    inputSearchConditionsWithCertLevels: function (searchConditions, awardAgent) {
        var url = App.serverHost + '/queryCertLevels';
        $.getJSON(url, function (result) {
            searchConditions.options.length = result.levels.length;
            for (var i = 0; i < searchConditions.options.length; i++) {
                searchConditions.options[i].value = result.levels[i].levelID;
                searchConditions.options[i].text = result.levels[i].levelInfo;
            }

            var url = App.serverHost + '/queryLevelIDByAgencyID?agencyID=' + awardAgent;
            $.getJSON(url, function (result) {
                searchConditions.value = result.levelID[0].levelID;
                searchConditions.disabled = "disabled";
            })
        })
    },

    bindClickCancelButtonEvent: function () {
        $(document).on('click', "#cancel", Forms.handleClickCancelButton);
    },

    handleClickCancelButton: function () {
        $('#inputCertID')[0].value = '';
        $('#inputWinnerAddress')[0].value = '';
        Forms.resetSelectAwardAgentValues();
        $('#chooseAwardDate')[0].value = new Date().toISOString().slice(0, 10);
        $('#inputDetailInfo')[0].value = '';
    },

    bindClickCommitButtonEvent: function () {
        $(document).on('click', "#commit", Forms.handleClickCommitButton);
    },

    handleClickCommitButton: function () {
        var certId = $('#inputCertID')[0].value;
        var winner = $('#inputWinnerAddress')[0].value;
        var awardAgent = $('#selectAwardAgent')[0].value;
        var certLevel = $('#selectCertLevel')[0].value;
        var awardDate = $('#chooseAwardDate')[0].value;
        var detailInfo = $('#inputDetailInfo')[0].value;

        var commissionInstance;
        web3.eth.getAccounts(function (error, accounts) {
            if (error) {
                console.log(error);
            }
            var account = accounts[0];
            //create the contact instance
            Forms.contracts.Commission.deployed().then(function (instance) {
                commissionInstance = instance;
                //send transaction to get the pet
                return commissionInstance.commit(0, { from: account });
            }).then(function (result) {
                return Forms.showCommitSuccessful();
            }).catch(function (err) {
                console.log(err.message);
            });
        });
    },

    showCommitSuccessful: function () {
        alert("Commit successfully!");
    },

    initQueryForms: function () {
        var queryInfo = $('<table id=\'tb_getCerts\' style="width: 48%; height: 64%; position: absolute; text-align: center; overflow-y:scroll; overflow: hidden"><caption id="certCaption">所获证书列表</caption><tr><th id="certHash">证书HASH值</th><th id="certDetail">查看详情</th></tr></table>');
        $('body').append(queryInfo);
        var searchMode = $('<select id= \'searchMode\' style="width: 15%; height: 40px; position: absolute; top: 25%; left: 50%; color: #674b19; font-size: 18px; font-weight: bolder; border: lavender 3px solid; background-color: transparent"><option default hidden>请选择查询方式</option><option value="byAgency">颁发机构</option><option value="byLevel">证书等级</option>');
        $('body').append(searchMode);
        var searchCondition = $('<select id= \'searchCondition\' style="width: 15%; height: 40px; position: absolute; top: 25%; left: 70%; color: #674b19; font-size: 18px; font-weight: bolder; border: lavender 3px solid; background-color: transparent"><option default hidden>请选择查询条件</option></select>');
        $('body').append(searchCondition);
        var searchBtn = $('<button id=\'btn_searchBy\' style="width: 5%; height: 40px; position: absolute; top: 25%; left: 94%; color: #674b19; font-size: 18px; font-weight: bolder; border: lavender 3px solid; background-color: transparent">查询</button>');
        $('body').append(searchBtn);
    },

    showEntryForms: function () {
        $('#tb_getCerts').css('display', 'none');
        $('#searchMode').css('display', 'none');
        $('#searchCondition').css('display', 'none');
        $('#btn_searchBy').css('display', 'none');
        $('#EntryInfo').css('display', 'block');
    },

    showQueryForms: function () {
        $('#EntryInfo').css('display', 'none');
        $('#tb_getCerts').css('display', 'block');
        $('#searchMode').css('display', 'block');
        $('#searchCondition').css('display', 'block');
        $('#btn_searchBy').css('display', 'block');
    }
};

$(function () {
    $(window).load(function () {
        Forms.initEntryForms();
        Forms.initQueryForms();
        Forms.showEntryForms();
        Forms.eventsInit();
        Forms.initWeb3Provider();
    });
});
