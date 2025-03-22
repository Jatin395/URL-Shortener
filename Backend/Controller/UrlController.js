const Url = require('../modules/Url');
const shortid = require('shortid');
const GenrateQR = require('../middleware/QR');

exports.CreateUrl = async (req, res) => {

    const userId = req.user._id;

    const { name, long } = req.body;

    if (!name || !long) {
        return res.status(400).json({ message: "Please fill All Inputs" });
    }
    const shortId = shortid.generate();
    const short = `http://localhost:5174/${shortId}`;

    const QR = await GenrateQR(long);

    const NUrl = new Url({
        name,
        short,
        long,
        UserId: userId,
        QR,
        shortId
    })
    await NUrl.save();
    return res.status(200).json({ data: NUrl });
}

//     const { id } = req.params;
//     const url = await Url.findOne({ shortId: id });
//     if (!url) {
//         return res.status(400).json({ message: "Url not Found" });
//     }
//     return res.redirect(url.long);
// }

// In your route handler:
exports.SendUrl = async (req, res) => {
    const { id } = req.params;
    const url = await Url.findOne({ shortId: id });
    if (!url) {
        return res.status(400).json({ message: "Url not Found" });
    }
    return res.json({ data: url.long });
};

exports.View = async (req, res) => {
    const { id } = req.params;
    const url = await Url.findOne({ _id: id });
    if (!url) {
        return res.status(400).json({ message: "Url not Found" });
    }
    return res.status(200).json({ data: url });
}

exports.UserUrls = async (req, res) => {
    const id = req.user._id;
    const Urls = await Url.find({ UserId: id });

    if (!Urls) {
        return res.status(400).json({ message: "Urls are not Found" });
    }
    return res.status(200).json({ data: Urls });
}

exports.UrlDelete = async (req, res) => {
    const id = req.params;
    const url = await Url.findOneAndDelete({ _id: id });

    if (!url) {
        return res.status(400).json({ message: "Url is not Found" });
    }
    return res.status(200).json({ message: "Url Deleted Successfully" });
}

exports.Update = async (req, res) => {
    const { name, long } = req.body;
    const url = await Url.findOneAndUpdate({ _id: id }, {
        name,
        long
    });
    if (!url) {
        return res.status(400).json({ message: "Url is not Found" });
    }
    return res.status(200).json({ message: "Url Updated Successfully" });
}
