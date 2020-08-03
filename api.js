const express = require('express')
const sqlite3 = require('sqlite3').verbose()
const db = new sqlite3.Database('./toDoBase.sqlite3')
const router = express.Router()


router.get('/todos', (req, res) => {
    db.all(`SELECT * FROM todos`, (err, results) => {
        res.send(results)
    })
})
router.get('/count', (req, res) => {
    db.get(`SELECT count(*) as q from todos`, (err, results) => {
        res.send(results)
    })
})
router.post('/addtodo', async (req, res) => {
    db.run(`INSERT INTO todos VALUES (
     ${req.body.id},
    '${req.body.name}',
    '${req.body.email}',
    '${req.body.todo}',
     ${req.body.status},
     ${req.body.changed}
        )`, (err, results) => {
        if (err) {
            console.log(err.message)
        }
        res.send('New ToDo was successfully added!')
    })
})

router.delete('/delete/:id', (req, res) => {
    db.run(`DELETE FROM todos WHERE id = ${req.params.id}`, (err, results) => {
        res.send('ToDo was successfully deleted!')
    })
})

router.post('/createauth', async (req, res) => {
    db.run(`INSERT INTO auth VALUES (
     ${req.body.id},
    '${req.body.name}',
    '${req.body.email}',
        )`, (err, results) => {
        if (err) {
            console.log(err.message)
        }
        res.send('Autorisation success!')
    })
})
router.post('/auth', async (req, res) => {
    console.log(req.body)
    db.get(`SELECT * FROM auth WHERE login LIKE '${req.body.login}' AND password LIKE '${req.body.password}'`, (err, results) => {
        if (err) {
            console.log(err.message)
        }
        res.send(results)
    })
})
router.get('/getauth', (req, res) => {
    db.get(`SELECT auth FROM auth`, (err, results) => {
        res.send(results)
        console.log(results)
    })
})
router.post('/authstatus', async (req, res) => {
    db.run(`UPDATE auth SET auth = ${req.body.auth} WHERE id = 1`, (err, results) => {
        if (err) {
            console.log(err.message)
        }
        res.send('Success')
    })
})

router.post('/updatestatus', async (req, res) => {
    db.run(`UPDATE todos SET status = ${req.body.status} WHERE id = ${req.body.id}`, (err, results) => {
        if (err) {
            console.log(err.message)
        }
        res.send('Success')
    })
})
router.post('/changed', async (req, res) => {
        db.run(`UPDATE todos SET todo = '${req.body.todo}', changed = ${req.body.changed} WHERE id = ${req.body.id}`, (err, results) => {
            if (err) {
                console.log(err.message)
            }
            res.send('Success')
        })
})

module.exports = router