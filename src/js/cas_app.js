
App = {
    serverHost: 'http://192.168.1.100:8080',
    web3Provider: null,
    contracts: {},

    init: async function () {
        return await App.initWeb3();
    },

    initWeb3: async function () {
        await LoginChecker.login();

        App.web3Provider = window.ethereum;

        // Legacy dapp browsers...
        if (window.web3) {
            App.web3Provider = window.web3.currentProvider;
        }
        // If no injected web3 instance is detected, fall back to Ganache
        else {
            App.web3Provider = new Web3.providers.HttpProvider('http://192.168.1.100:7545');
        }
        web3 = new Web3(App.web3Provider);

        App.bindSelectSearchModeEvent();
        App.bindFindCertificateHashByUserAddressEvent();
        App.bindFindSpecialCertificateHashesEvent();
    },

    bindSelectSearchModeEvent: function () {
        $(document).on('change', '#searchMode', App.handleSelectSearchMode);
    },

    handleSelectSearchMode: function () {
        var searchConditions = $('#searchCondition')[0];
        searchConditions.options.length = 0;

        var selectedIndex = $('#searchMode')[0].selectedIndex;
        switch (selectedIndex) {
            case 1:
                App.inputSearchConditionsWithAgencies(searchConditions);
                break;
            case 2:
                App.inputSearchConditionsWithCertLevels(searchConditions);
                break;
        }
    },

    inputSearchConditionsWithAgencies: function (searchConditions) {
        var url = App.serverHost + '/queryCertAgencies';
        $.getJSON(url, function (result) {
            searchConditions.options.length = result.agencies.length;
            for (var i = 0; i < searchConditions.options.length; i++) {
                searchConditions.options[i].value = result.agencies[i].agencyID;
                searchConditions.options[i].text = result.agencies[i].agencyInfo;
            }
        })
    },

    inputSearchConditionsWithCertLevels: function (searchConditions) {
        var url = App.serverHost + '/queryCertLevels';
        $.getJSON(url, function (result) {
            searchConditions.options.length = result.levels.length;
            for (var i = 0; i < searchConditions.options.length; i++) {
                searchConditions.options[i].value = result.levels[i].levelID;
                searchConditions.options[i].text = result.levels[i].levelInfo;
            }
        })
    },

    bindFindSpecialCertificateHashesEvent: function () {
        $(document).on('click', '#btn_searchBy', App.handleFinSpecialCertificateHashes);
    },

    handleFinSpecialCertificateHashes: function () {
        var userAddress = App.web3Provider.selectedAddress;
        var searchCondition = $('#searchCondition')[0].value;

        var url = '';
        var selectedIndex = $('#searchMode')[0].selectedIndex;
        switch (selectedIndex) {
            case 1:
                url = App.serverHost + '/findCertificateHashByUserAddressAndAgencyID?userAddress=' + userAddress + '&agencyID=' + searchCondition;
                break;
            case 2:
                url = App.serverHost + '/findCertificateHashByUserAddressAndLevelID?userAddress=' + userAddress + '&levelID=' + searchCondition;
                break;
        }

        if (url != '')
            App.addCerttificateHashFromUrl(url);
    },

    bindFindCertificateHashByUserAddressEvent: function () {
        $(document).on('click', '#search', App.handleFindCertificateHashByUserAddress);
    },

    handleFindCertificateHashByUserAddress: function (userAddress) {
        var userAddress = App.web3Provider.selectedAddress;
        var baseUrl = App.serverHost + '/findCertificateHashByUserAddress?userAddress=';
        var url = baseUrl + userAddress;
        App.addCerttificateHashFromUrl(url);
    },

    addCerttificateHashFromUrl: function (url) {
        $.getJSON(url, function (result) {
            $('body').remove('#EntryInfo');
            var table = $('#tb_getCerts');
            table.empty();

            var title = $('<caption id="certCaption" style="height: 60px; background-color: #674b19; color: lavender; font-weight: bolder; font-size: 28px; text-align: center; line-height: 60px">所获证书列表</caption><tr style="width: 100%; height: 40px; background: transparent; color: #674b19; font-size: 20px"><th id="certHash" style="height: 30px; border: lavender 2px solid; width: 88%; font-size: 22px">证书HASH值</th><th id="certDetail" style="height: 30px; border: lavender 2px solid; width: 12%; font-size: 22px">查看详情</th></tr>');
            table.append(title);


            result['certHash'].forEach(item => {
                var row = $('<tr style="width: 100%; height: 40px; background: transparent; color: #674b19; font-size: 20px"></tr>');

                var column0 = $('<th style="height: 30px; border: lavender 2px solid; width: 88%; font-size: 22px"></th>').text(item['certHash']);
                row.append(column0);

                var column1 = $('<th style="height: 30px; border: lavender 2px solid; width: 12%; font-size: 22px; position: relative"><button class="btn_showDetails" style="width: 100%; height: 100%; position: absolute; top: 0; left: 0; font-size: 24px; background: transparent; border: none; font-weight: bolder; color: #674b19">>></button></th>');
                row.append(column1);


                table.append(row);
            });
        })
    }

};

$(function () {
    $(window).load(function () {
        App.init();
    });
});

