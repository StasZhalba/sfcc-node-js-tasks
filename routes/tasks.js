const {Router, response} = require('express');
const User = require('../models/User');
const router = Router();

router.get('/', (req, res) => {
    res.render('index', {
        title: 'Home'
    });
});

router.get('/task1/:name/:surname/:age', (req, res) => {
    let age = req.params.age;
    let name = req.params.name;
    let surname = req.params.surname;

    let message = age > 18 ? `Hello ${name} ${surname}` : '';


    res.render('task1', {
        title: 'Task 1',
        description: `Create route and request with 3 parameters: name, surname, age. If age > 18. Send response: "Hello <name> <surname>"`,
        taskResult: message
    });
});

router.get('/users', async (req, res) => {
    const users = await User.find({});

    res.send(users);
});

router.get('/task2', (req, res) => {
    res.render('task2', {
        title: 'Task 2',
        description: 'To previous server add another route and request with 4 parameters:\n' +
            'email, name, surname, age. If age > 18 save email, name and surname in database(you can use any DB). Send response: "Done" if true, otherwise send error.',
    });
});

router.post('/user/create', async (req, res) => {
    if (req.body.age <= 18) {
        res.send('Age should be more than 18');

        return;
    }

    const user = new User({
        email: req.body.email,
        name: req.body.name,
        surname: req.body.surname,
        age: req.body.age,
    });

    await user.save();

    res.send('Done');
});

router.get('/task3', (req, res) => {
    res.render('task3', {
        title: 'Task 3',
        description: 'Add ability to find all users by email. Send request with email. Return list of full names.'
    });
});

router.get('/users/find', async (req, res) => {
    const users = await User.find({email: req.query.email}, 'name surname');
    let usersNames = [];

    for (let user of users) {
        usersNames.push(`${user.name} ${user.surname}`);
    }

    res.send(usersNames);
});

module.exports = router;