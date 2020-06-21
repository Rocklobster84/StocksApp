const mongoose = require('mongoose');

const stocksSchema = new mongoose.Schema({
	 Ticker: {
		  type: String,
	 },
	 ['Profit Margin']: {
		  type: Number,
	 },
  ['Institutional Ownership']: {
    type: Number
  },
  ['EPS growth past 5 years']: {
    type: Number
  },
  ['Total Debt/Equity']: {
    type: Number
  },
  ['Current Ratio']: {
    type: Number
  },
  ['Return on Assets']: {
    type: Number
  },
  Sector  : {
    type: String
  },
  ['P/S']: {
    type: Number
  },
  ['Change from Open']: {
    type: Number
  },
  ['Performance (YTD)']: {
    type: Number
  },
  ['Performance (Week)']: {
    type: Number
  },
  ['Quick Ratio']: {
    type: Number
  },
  ['Insider Transactions']: {
    type: Number
  },
  ['P/B']: {
    type: Number
  },
  ['EPS growth quarter over quarter']: {
    type: Number
  },
  ['Payout Ratio']: {
    type: Number
  },
  ['Performance (Quarter)']: {
    type: Number
  },
  ['Forward P/E']: {
    type: Number
  },
  ['P/E']: {
    type: Number
  },
  ['200-Day Simple Moving Average']: {
    type: Number
  },
  ['Shares Outstanding']: {
    type: Number
  },
  ['Earnings Date']: {
    type: Date
  },
  ['52-Week High']: {
    type: Number
  },
  ['P/Cash']: {
    type: Number
  },
  Change: {
    type: Number
  },
  ['Analyst Recom']: {
    type: Number
  },
  ['Volatility (Week)']: {
    type: Number
  },
  Country: {
    type: String
  },
  ['Return on Equity']: {
    type: Number
  },
  ['50-Day Low']: {
    type: Number
  },
  Price: {
    type: Number
  },
  ['50-Day High']: {
    type: Number
  },
  ['Return on Investment']: {
    type: Number
  },
  ['Shares Float']: {
    type: Number
  },
  ['Dividend Yield']: {
    type: Number
  },
  ['EPS growth next 5 years']: {
    type: Number
  },
});

stocksSchema.set('collection', 'Stocks');

module.exports = mongoose.model('Stocks', stocksSchema);