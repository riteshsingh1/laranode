import { body } from 'express-validator';
const validateCreateUsersRequest =  [ 
body("name").notEmpty(), 
body("email").notEmpty(), 
body("mobile").notEmpty(), 
body("password").notEmpty(), 
] 
const validateUpdateUsersRequest =  [ 
 body("id").notEmpty(), 
body("name").notEmpty(), 
body("email").notEmpty(), 
body("mobile").notEmpty(), 
body("password").notEmpty(), 
] 
const validateEditUsersRequest  = [ 
body("id").notEmpty(), 
] 
const validateDeleteUsersRequest  =  [ 
body("id").notEmpty(), 
] 

export const usersRequestValidator = {
  validateDeleteUsersRequest,
  validateEditUsersRequest,
  validateUpdateUsersRequest,
  validateCreateUsersRequest,

}
    