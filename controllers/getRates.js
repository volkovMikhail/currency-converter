const api = require('../utils/apiRequest');

module.exports = async (req, res) => {
    let data;
    try {
        data = await api(`${process.env.API_LATEST}?base=${req.params.currencyCode}&amount=${req.params.amount}&places=4`);
    } catch (error) {
        data = error;
    }
    if (data.success) {
        res.status(200).json(data);
    } else {
        res.status(500).json(data);
    }
};
