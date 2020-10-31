const express = require('express');
const authentication = require('../../controller/authentication')()
const getRoute = express.Router()
const controller = require('../../controller/controllers')()

/**
 * @swagger
 * components:
 *       securitySchemes:
 *           bearerAuth:
 *               type: http
 *               scheme: bearer
 *               bearerFormat: JWT
 *       schemas:
 *           error:
 *               content:
 *                   application/json:
 *                       schema:
 *                           type: object
 *                           properties:
 *                               success:
 *                                   type: boolean
 *                               msg: 
 *                                   type: string   
 *           responseTwit:
 *              200:
 *                 description: An array of twits from user
 *                 content: 
 *                    application/json:
 *                       schema:
 *                          type: array
 *                          items:
 *                             type: object
 *                             properties:
 *                                id:
 *                                   type: integer
 *                                UserId: 
 *                                   type: integer
 *                                posts:
 *                                   type: string
 *                                image: 
 *                                   type: string
 *                                createdAt: 
 *                                   type: string
 *                                Comments:
 *                                   type: array
 *                                Likes:
 *                                   type: array
 *                                Users: 
 *                                   type: object
 *                                   properties:
 *                                       name: 
 *                                          type: string
 *              404:
 *                 description: The resource was not found
 *                 $ref: '#/components/schemas/error' 
 *              500:
 *                 description: Unexpected error
 *                 $ref: '#/components/schemas/error' 
 *           responseUser:
 *              '200':
 *                  description: Got the details
 *                  content: 
 *                      application/json:
 *                          schema:
 *                             type: object
 *                             properties:
 *                                id:
 *                                   type: integer
 *                                name: 
 *                                   type: string
 *                                email:
 *                                   type: string
 *                                createdAt: 
 *                                   type: string
 *                                username:
 *                                   type: string
 *              '400':
 *                  description: Authorization information is missing or invalid
 *                  content:
 *                      application/json:
 *                          schema:
 *                              type: object
 *                              properties:
 *                                  success:
 *                                     type: boolean
 *                                  msg: 
 *                                     type: string 
 *              '401':
 *                  description: Authorization information is missing or invalid
 *                  content:
 *                     application/json:
 *                        schema:
 *                           type: object
 *                           properties:
 *                              success:
 *                                 type: boolean
 *                              msg: 
 *                                 type: string
 *              '500':
 *                  description: Unexpected error
 *                  content:
 *                      application/json:
 *                         schema:
 *                            type: object
 *                            properties:
 *                                success:
 *                                   type: boolean
 *                                msg: 
 *                                   type: string      
 */

/**
 * @swagger
 * /twits:
 *     get:
 *         summary: Get all twits of users
 *         description: Get all twits of users
 *         security:
 *            - bearerAuth: []
 *         responses:
 *            $ref: '#/components/schemas/responseTwit'
 *                  
 */
getRoute.get('/twits', authentication.authenticate, authentication.validate, controller.allTwit)


/**
 * @swagger
 * /twits/user/{userId}:
 *    get:
 *      description: Get all details of users
 *      security:
 *        - bearerAuth: []
 *      parameters:
 *        - in: path
 *          name: userId
 *          schema:
 *            type: integer
 *          required: true
 *          description: Numeric ID of the user to get
 *      responses:
 *        $ref: '#/components/schemas/responseUser'
 */
getRoute.get('/twits/user/:id', authentication.authenticate, authentication.validate, controller.getUserById)

/**
 * @swagger
 * /twits/user:
 *     get:
 *         summmary: Get id of user
 *         description: Get id of user
 *         security:
 *            - bearerAuth: []
 *         responses:
 *            $ref: '#/components/schemas/responseUser'         
 */
getRoute.get('/twits/user', authentication.authenticate, authentication.validate, controller.getUser)

module.exports = getRoute