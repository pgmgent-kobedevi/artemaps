const NotFoundError = require('../errors/NotFoundError');
const ValidationError = require('../errors/ValidationError');
const { Project } = require('../models/Project');

class ProjectController {
        
    getProjects = async(req, res, next) => {
        try {
            const projects = await Project.find().lean().populate('client', ['company']).exec();
            res.status(200).json(projects);
        } catch (e) {
            next(e);
        }
    }

    getProjectById = async(req, res, next) => {
        try {
            const {id} = req.params;
            const project = await Project.findById(id).populate('client').exec();
            if(project) {
                res.status(200).json(project);
            } else {
                next(new NotFoundError());
            }
        } catch(e) {
            next(e);
        }
    }

    deleteProjectById = async(req,res,next) => {
        // TODO: delete products as well
        try {
            const {id} = req.params;
            const project = await Project.findById(id).exec();
            if(project) {
                await project.remove();
                res.status(200).json({message: "Project removed"});
            } else {
                next(new NotFoundError());
            }
        } catch(e) {
            next(e);
        }
    }

    updateProjectById = async(req,res,next) => {
        try {
            const {id} = req.params;
            // find 
            const project = await Project.findById(id).exec();
            if(project) {
                // update
                project.overwrite(req.body);
                const result = await project.save();
                res.status(200).json(result);
            } else {
                next(new NotFoundError());
            }
        } catch(e) {
            next(e.name && e.name === "ValidationError" ? new ValidationError(e) : e);
        }
    }
    
    createProject = async (req, res, next) => {
        try {
            const project = new Project(req.body);
            const c = await project.save();
            res.status(200).json(c);
        } catch (e) {
            next(e.name && e.name === "ValidationError" ? new ValidationError(e) : e);
        }
    }

}

module.exports = ProjectController;