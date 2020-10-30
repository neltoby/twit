const express = require('express');
const controller = require('../../controller/controllers')()
const authentication = require('../../controller/authentication')()
const deleteRoute = express.Router()

/**
 * @swagger
 * components:
 *   securitySchemes:
 *      bearerAuth:
 *         type: http
 *         scheme: bearer
 *         bearerFormat: JWT  
 *   schemas:   
 *       error:
 *           content:
 *               application/json:
 *                   schema:
 *                       type: object
 *                       properties:
 *                           success:
 *                              type: boolean
 *                           msg: 
 *                              type: string 
 */

/**
 * @swagger
 * /twits/{postId}:
 *     delete:
 *         summary: Delete post you own 
 *         security:
 *            - bearerAuth: []
 *         parameters:
 *            - in: path
 *              name: postId
 *              schema:
 *                 type: integer
 *              required: true
 *              description: Numeric ID of the post to delete
 *         responses:
 *             204:
 *                 description: Deleted
 *                 content:
 *                     text/plain:
 *                         schema:
 *                             type: integer
 *             400:
 *                 description: Bad Request
 *                 $ref: '#/components/schemas/error'
 *             401:
 *                 description: Authorization information is missing or invalid
 *                 $ref: '#/components/schemas/error'
 *             404:
 *                 description: Post doesn not exist
 *                 $ref: '#/components/schemas/error'
 *             500:
 *                 description: Unexpected error
 *                 $ref: '#/components/schemas/error'           
 */
deleteRoute.delete('/twits/:postId', authentication.authenticate, authentication.validate, controller.deletePost)

/**
 * @swagger
 * /twits/{postId}/likes:
 *     delete:
 *         summary: Unlike a post
 *         security:
 *            - bearerAuth: []
 *         parameters:
 *            - in: path
 *              name: postId
 *              schema:
 *                 type: integer
 *              required: true
 *              description: Numeric ID of the post to unlike
 *         responses:
 *             204:
 *                 description: Deleted
 *                 content:
 *                     text/plain:
 *                         schema:
 *                             type: integer
 *             400:
 *                 description: Bad Request
 *                 $ref: '#/components/schemas/error'
 *             401:
 *                 description: Authorization information is missing or invalid
 *                 $ref: '#/components/schemas/error'
 *             500:
 *                 description: Unexpected error
 *                 $ref: '#/components/schemas/error' 
 */
deleteRoute.delete('/twits/:postId/likes', authentication.authenticate, authentication.validate, controller.unlikePost)

module.exports = deleteRoute