const express = require('express');
const postRoute = express.Router()
const controller = require('../../controller/controllers')()
const authentication = require('../../controller/authentication')()
const genToken = require('../../controller/util').genToken

/**
 * @swagger
 * components:
 *   securitySchemes:
 *     bearerAuth:
 *       type: http
 *       scheme: bearer
 *       bearerFormat: JWT  
 *   schemas:
 *       PostFailedResponse:
 *            400:
 *               description: Bad request
 *               $ref: '#/components/schemas/Error'
 *            401:
 *               description: Authorization information is missing or invalid
 *               $ref: '#/components/schemas/Error'  
 *            500:
 *               description: Unexpected error
 *               $ref: '#/components/schemas/Error' 
 *       responsesComment:
 *           '200':
 *               description: Comment successful
 *               content: 
 *                  application/json:
 *                     schema:
 *                        type: object
 *                        properties:
 *                           id:
 *                              type: integer
 *                           UserId: 
 *                              type: integer
 *                           PostId:
 *                               type: string
 *                           comment:
 *                               type: string  
 *                           createdAt: 
 *                               type: string
 *           '401':
 *              description: Authorization information is missing or invalid
 *              $ref: '#/components/schemas/Error' 
 *           '404':
 *              description: Post resource do not exist
 *              $ref: '#/components/schemas/Error'  
 *           '500':
 *              description: Unexpected error
 *              $ref: '#/components/schemas/Error'  
 *       responsesLike:
 *           '200':
 *               description: Liked post successful
 *               content: 
 *                  application/json:
 *                     schema:
 *                        type: object
 *                        properties:
 *                           id:
 *                              type: integer
 *                           UserId: 
 *                              type: integer
 *                           PostId:
 *                               type: string
 *                           createdAt: 
 *                               type: string
 *           '400':
 *              description: Bad Request
 *              $ref: '#/components/schemas/Error' 
 *           '401':
 *              description: Authorization information is missing or invalid
 *              $ref: '#/components/schemas/Error' 
 *           '404':
 *              description: Post resource do not exist
 *              $ref: '#/components/schemas/Error'  
 *           '500':
 *              description: Unexpected error
 *              $ref: '#/components/schemas/Error' 
 *       responses:
 *           '200':
 *               description: User has been logged in
 *               headers:
 *                  token:
 *                      schema:
 *                         type: string 
 *                      description: Bearer token for subsequent calls
 *               content: 
 *                  application/json:
 *                     schema:
 *                        type: object
 *                        properties:
 *                           id:
 *                              type: integer
 *                           name: 
 *                              type: string
 *                           email:
 *                               type: string
 *                           createdAt: 
 *                               type: string
 *                           username:
 *                               type: string
 *           '404':
 *              description: The resource was not found
 *              $ref: '#/components/schemas/Error' 
 *           '500':
 *              description: Unexpected error
 *              $ref: '#/components/schemas/Error'
 *       Error: 
 *          content:
 *             application/json:
 *                 schema:
 *                     type: object
 *                     properties:
 *                          success:
 *                             type: boolean
 *                          msg: 
 *                             type: string 
 */

/**
 * @swagger
 * /twits/login:
 *    post:
 *        summary: Login a user
 *        requestBody:
 *           description: user data in json
 *           required: true
 *           content:
 *               application/json:
 *                   schema:
 *                      type: object
 *                      properties:
 *                         email:
 *                            type: string
 *                         password: 
 *                             type: string
 *        responses:
 *           $ref: '#/components/schemas/responses'
 */
postRoute.post('/twits/login', authentication.loginValidation, controller.login, genToken, (req,res) => {
    res.json(req.user)
})

/**
 * @swagger
 * /twits/register:
 *     post:
 *        summary: Creates a new user
 *        requestBody:
 *           description: user data in json
 *           required: true
 *           content:
 *               application/json:
 *                   schema:
 *                      type: object
 *                      properties:
 *                         fullname:
 *                            type: string
 *                         email:
 *                            type: string
 *                         password: 
 *                             type: string
 *        responses:
*            $ref: '#/components/schemas/responses'
 */
postRoute.post('/twits/register', authentication.registerValidation, controller.registration, genToken, (req, res) => {
    res.json(req.user)
})


/**
 * @swagger
 * /twits:
 *     post:
 *         summary: Post twits
 *         security:
 *            - bearerAuth: []
 *         requestBody:
 *            description: post string in json format
 *            required: true
 *            content:
 *               application/json:
 *                   schema:
 *                      type: object
 *                      properties:
 *                          posts:
 *                            type: string
 *         responses:
 *            '200':
 *               description: Twit was posted successfully
 *               content:
 *                   application/json: 
 *                       schema:
 *                           type: object
 *                           properties:
 *                               id:
 *                                  type: integer
 *                               UserId: 
 *                                  type: integer
 *                               posts:
 *                                  type: integer
 *                               createdAt:
 *                                  type: integer
 *                               image:
 *                                  type: integer
 *                               Comments:
 *                                  type: array
 *                               Likes:
 *                                  type: array
 *                               User:
 *                                  type: object
 *                                  properties:
 *                                      name:
 *                                          type: string
 *            $ref: '#/components/schemas/PostFailedResponse'           
 */
postRoute.post('/twits', authentication.authenticate, authentication.validate, controller.postTwit)

/**
 * @swagger
 * /twits/comments:
 *    post:
 *        summary: Comment post
 *        security:
 *           - bearerAuth: []
 *        requestBody:
 *            description: post id and comment in json
 *            required: true
 *            content:
 *               application/json:
 *                   schema:
 *                      type: object
 *                      properties:
 *                          postid:
 *                              type: integer
 *                          comment: 
 *                              type: string
 *        responses:
 *            $ref: '#/components/schemas/responsesComment'
 *                    
 */
postRoute.post('/twits/comments', authentication.authenticate, authentication.validate, controller.commentPost)

/**
 * @swagger
 * /twits/{postId}/likes:
 *     post:
 *         summary: Likepost endpoint
 *         security:
 *            - bearerAuth: []
 *         parameters:
 *            - in: path
 *              name: postId
 *              schema:
 *                 type: integer
 *              required: true
 *              description: Numeric ID of the post to like
 *         responses:
 *             $ref: '#/components/schemas/responsesLike'             
 */
postRoute.post('/twits/:postId/likes', authentication.authenticate, authentication.validate, controller.likePost)

module.exports = postRoute