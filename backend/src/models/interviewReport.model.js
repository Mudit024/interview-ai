const mongoose = require("mongoose");





/**
 * Interview Report Schema
 * - jobDescription
 * - resumeText
 * - selfDescription
 * - AI generated match score
 * - technical questions
 * - behavioral questions
 * - skill gaps
 * - preparation plan
 */

const technicalQuestionSchema = new mongoose.Schema(
      {
            question: {
                  type: String,
                  required: [true, "Technical question is required"],
            },

            intention: {
                  type: String,
                  required: [true, "Intention is required"],
            },

            answer: {
                  type: String,
                  required: [true, "Answer is required"],
            },
      },
      {
            _id: false,
      }
);

const behavioralQuestionSchema = new mongoose.Schema(
      {
            question: {
                  type: String,
                  required: true,
            },

            intention: {
                  type: String,
                  required: true,
            },

            answer: {
                  type: String,
                  required: true,
            },
      },
      {
            _id: false,
      }
);


const skillGapSchema=new mongoose.Schema({
       skill:{
            type:String,
            required:[true,"Skills is required"]
       },
        severity:{
            type:String,
            enum:["low","medium","high"],
            required : [true,"Severity is required"]
        }
      },{
            _id:false
})

const preparationPlanSchema=new mongoose.Schema({
      day:{
            type:Number,
            required:[true,"Day is required"]
      },
      focus:{
            type:String,
            required:[true,"Focus is required"]
      },
      tasks:{
            type:String,
            required:[true,"Task is required"]  
      }
})



const interviewReportSchema = new mongoose.Schema(
      {
            jobDescription: {
                  type: String,
                  required: true,
            },

            resumeText: {
                  type: String,
            },

            selfDescription: {
                  type: String,
            },

            matchScore: {
                  type: Number,
                  min: 0,
                  max: 100,
            },

            technicalQuestions: [technicalQuestionSchema],
            behavioralQuestions: [behavioralQuestionSchema],
             skillGaps:[skillGapSchema],
            preparationPlan: [preparationPlanSchema],
      },
      {
            timestamps: true,
      }
);
const interviewReportModel=mongoose.model("InterviewReport",interviewReportSchema)

module.exports = interviewReportModel;