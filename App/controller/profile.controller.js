import express from 'express';

const getProfilePage = (req, res) => {
    if (!req.isAuthenticated()) {
        res.redirect("/login");
        return;
    }
    const user = req.user;
    res.render("profile.ejs", { user, basePath: "../" });
};

export {getProfilePage};