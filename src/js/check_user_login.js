LoginChecker = {
    // Login.
    login: async function () {
        var userAddress = await LoginChecker.getUserAddress();
        await LoginChecker.jumpToNextPage(userAddress);
    },

    // Get current user address.
    getUserAddress: async function () {
        var userAddress;

        try {
            userAddress = await window.ethereum.enable();
        } catch {
            location.reload();
        }

        return userAddress[0];
    },

    // Jump to next page by userAddress.
    jumpToNextPage: async function (userAddress) {
        var baseUrl = 'http://192.168.0.103:8080/queryUserLevelByUserAddress?userAddress=';
        var url = baseUrl + userAddress;

        $.getJSON(url, function (result) {
            var currentLocations = location.href.split('/');
            var currentPage = currentLocations[currentLocations.length - 1];
            var userLevel = parseInt(result['userLevel'][0].userLevel);

            switch (userLevel) {
                case 1:
                    if (currentPage != "EntryCertificates.html")
                        location.href = "EntryCertificates.html";
                    break;
                case 0:
                    if (currentPage != "ShowCertificates.html")
                        location.href = "ShowCertificates.html";
                default:
                    break;
            }
        })
    }
}

$(function () {
    $(window).load(function () {
        LoginChecker.login();
    });
});
