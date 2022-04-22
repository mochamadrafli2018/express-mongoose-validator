const User = require('../Models/User.model')

module.exports = {
    find : async (req, res) => {
        try {
            const users = await User.find()
            return res.status(200).send(users)
        }
        catch (error) {
            return res.status(500).send({
                message: error.message || 'some error ocurred while retrieving data.',
            });
        }
    },
    findById : async (req, res) => {
        // if user exist
        try {
            const user = await User.findById({ _id:req.params.id })
            if (!user) throw createError.NotFound('User not found')
            return res.status(200).send(user);
        }
        catch (err) {
            if(err.kind === 'ObjectId') 
                return res.status(404).send({ message: 'data not found with id ' + req.params.id });
            return res.status(500).send({ message: 'error retrieving data with id ' + req.params.id });
        }
    },
    findOneAndUpdate : (req, res) => {
        console.log(req.body);
        User.findById({_id:req.params.id})
        .then((currentData) => {
            let {newName, newEmail, newPassword, newGender, newRole, newUpdatedScreeningResult} = '';
            if (!req.body.name) { newName = currentData.name}
            if (!req.body.email) { newEmail = currentData.email}
            if (!req.body.password) { newPassword = currentData.password}
            if (!req.body.gender) { newGender = currentData.gender}
            if (!req.body.role) { newRole = currentData.role}
            if (!req.body.updatedScreeningResult) { newUpdatedScreeningResult = currentData.updatedScreeningResult}
            if (req.body.name) { newName = req.body.name}
            if (req.body.email) { newEmail = req.body.email}
            if (req.body.password) { newPassword = req.body.password}
            if (req.body.gender) { newGender = req.body.gender}
            if (req.body.role) { newRole = req.body.role}
            if (req.body.updatedScreeningResult) { newUpdatedScreeningResult = req.body.updatedScreeningResult}
            const newData = User({
                name: newName,
                email: newEmail,
                password: newPassword,
                gender: newGender,
                role: newRole,
                updatedScreeningResult: newUpdatedScreeningResult,
                _id: req.params.id
            });
            console.log(newData)
            // update with new data
            User.findByIdAndUpdate( {_id: req.params.id}, newData, { new: true } )
            .then((updatedData) => {
                console.log('success update data');
                return res.status(200).send(updatedData);
            }).catch((err) => {
                if(err.kind === 'Object_id')
                    return res.status(404).send({ message: 'data not found with _id ' + req.params._id, });
                return res.status(500).send({ message: 'error updating data with _id ' + req.params._id, });
            });
        })
        .catch((err) => {
            if(err.kind === 'ObjectId')
                return res.status(404).send({ message: 'data not found with id ' + req.params.id });
            return res.status(500).send({ message: 'error retrieving data with id ' + req.params.id });
        });
    },
    findByIdAndRemove : (req, res) => {
        try {
            User.findByIdAndRemove({_id: req.params.id}).then(() => {
                return res.status(200).send({ message: 'data deleted successfully!' });
            })
        }
        catch (err) {
            if(err.kind === 'ObjectId' || err.name === 'NotFound')
                return res.status(404).send({ message: 'data not found with id ' + req.params.id, });
            return res.status(500).send({ message: 'could not delete data with id ' + req.params.id, });
        };
    },
    removeAll : (req, res) => {
        User.remove({})
        .then(() => { return res.status(200).send({ message: 'All data deleted successfully!' }); }) 
        .catch((err) => { return res.status(500).send({ message: 'Could not delete all data' }); })
    }
};