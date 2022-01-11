const Blog = require('../models/blog');

function index(req, res){
    Blog.find().sort({ createdAt: -1 })
        .then((result)=>{
            res.render("index", {
                title: "Blogs",
                blogs: result
            })
        })
}

function createGET(req, res) {
    res.render("create", { title: "Create Blog" });
}

function details(req, res) {
    const id = req.params.id
    Blog.findById(id)
        .then((result)=>{
            res.render("details", {blog:result, title: result.title})
        })
        .catch((err)=>{
            res.status(404).render("404", { title: "Blog Not Found" })
        })
}

function createPOST(req, res){
    const blog = new Blog(req.body);

    blog.save()
        .then((result)=>{
            res.redirect("/")
        })
        .catch((err)=>{
            console.log(err)
        })
}

function remove(req, res){
    const id = req.params.id

    Blog.findByIdAndDelete(id)
        .then((result)=>{
            res.json({ redirect:"/" })
        })
        .catch((err)=>{
            console.log(err)
        })

}

module.exports={
    index,
    createGET,
    details,
    createPOST,
    remove
}