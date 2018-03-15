'use strict';
/**
 * Transaction logic
 */

/**
 * Customer buys fuel or from the Q8 shop
 * @param {com.cegeka.Buy} buy
 * @transaction
 */
function onBuy(buy) {
    return getAssetRegistry('com.cegeka.LoyaltyCard').then(function(assetRegistry) {
        var limit = 5;
        if (buy.product === 'fuel') {
            limit = 25;
        }

        if (buy.amount >= limit) {
            buy.card.balance += buy.multiplier * buy.amount;

            return assetRegistry.update(buy.card);
        }
    });
}

/**
 * Customer spends coins at a shop
 * @param {com.cegeka.SpendCoins} spendCoins 
 */
function onSpendCoins(spendCoins) {
    return getAssetRegistry('com.cegeka.LoyaltyCard').then(function(assetRegistryCards) {
        return getAssetRegistry('com.cegeka.ShopAccount').then(function(assetRegistryShops) {
            // 1 point = 0.01 euro
            var requiredPoints = spendCoins.euroPrice * 100;

            // Can't buy smokes
            if (spendCoins.product !== 'cigarettes') {
                // The full price cannot be covered with points
                var pointsToSpend = requiredPoints;
                if (spendCoins.card.balance < requiredPoints) {
                    // All of it
                    pointsToSpend = spendCoins.card.balance;
                }

                spendCoins.card.balance -= pointsToSpend;
                spendCoins.shop.coinBalance += pointsToSpend;

                return assetRegistryShops.update(spendCoins.shop).then(
                    function() { return assetRegistryCards.update(spendCoins.card);});
            }
        });
    });
}

/**
 * Shop converts coins to euro
 * @param {com.cegeka.SettleCoins} settleCoins 
 */
function onSettleCoins(settleCoins) {
    return getAssetRegistry('com.cegeka.ShopAccount').then(function(assetRegistryShops) {
        var settlementAmount = settleCoins.shop.coinBalance / 100;

        settleCoins.shop.euroBalance += settlementAmount;
        settleCoins.shop.coinBalance = 0;

        return assetRegistryShops.update(settleCoins.shop);
    });
}