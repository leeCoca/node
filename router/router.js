const express = require("express")
const router = express.Router()
const User = require("../schema/userSchema")
const Blog = require("../schema/blog")


router.get('/', function(req, res) {
	if (req.session.loginUser) {
		res.redirect("/blog")
	} else {
	    res.render('index.html', {
	    	userEmail: req.session.loginUser
	    })
	}
})

router.get('/register', function(req, res) {
	res.render('register.html')
})


router.post('/register', function (req, res) { 
  let body = req.body
  User.findOne({
  	name: body.name
  }, function (err, data) {
  	if (err) {
  		return res.status(500).json({
  			code: 2,
  			message: "server error"
  		})
  	}
  	if (data) {
  		return res.status(200).json({
  			code: 1,
  			message: "用户已存在"
  		})
  	}
  	new User(body).save(function (err) {
  		if (err) {
	  		return res.status(500).json({
	  			code: 500,
	  			message: "server error"
	  		})
	  	}
	  	
        req.session.loginUser = body.name;
        res.json({code: 0, message: '登录成功'});                           
  	})

  	
  })
})

router.get('/login', function (req, res) {
	res.render("login.html")
})

router.post('/login', function (req, res) {
	let body = req.body
	User.find({name: body.name, password: body.password})
		  .then(data => {
		  	if (data != '') {
		  		req.session.loginUser = body.name;
		  		console.log(req.session);
		  		res.status(200).json({
			  		code: 0,
			  		message: "success"
			  	})
		  	} else {
		  		res.status(200).json({
			  		code: -1,
			  		message: "success"
			  	})
		  	}
		  })
})

router.get('/blog', function (req, res) {
	Blog.find((err, data) => {
		if (err) {
			return res.status(500).json({
	  			success: 500,
	  			message: "server error"
	  		})
		}
		res.render("blog.html", {
			blogData: data,
			userEmail: req.session.loginUser
		})

	})
})

router.get('/issue', function (req, res) {
	res.render("issue.html", {
		userEmail: req.session.loginUser
	})
})

router.post('/issue', function (req, res) {
	new Blog(req.body).save(err => {
		if (err) {
	  		return res.status(500).json({
	  			success: 500,
	  			message: "server error"
	  		})
	  	}
	  	res.status(200).json({
	  		code: 0,
	  		message: "success"
	  	})
	})
})

router.get('/loginOut', (req, res) => {
	req.session.destroy();
	res.redirect("/")
})

module.exports = router