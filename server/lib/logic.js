'use strict';
/**
 * Hyperledger Composer business network definition: Script file
 */



/* global getAssetRegistry getFactory emit query */

/**
 * Track the trade of a commodity from one trader to another
 * @param {com.cegeka.Trade} trade - the trade to be processed
 * @transaction
 */
async function tradeCommodity(trade) { // eslint-disable-line no-unused-vars

    // set the new owner of the commodity
    trade.tradeable.previousOwner = trade.sender;

    // set the new owner of the commodity
    trade.tradeable.owner = trade.newOwner;
   
    const assetRegistry = await getAssetRegistry('com.cegeka.Tradeable');

    // persist the state of the commodity
    await assetRegistry.update(trade.tradeable);
}