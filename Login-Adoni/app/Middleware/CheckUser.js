'use strict'
/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

class CheckUser {
  /**
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Function} next
   */
  async handle ({ request,response,auth }, next) {
    // call next to advance the request
    try{
      
      if(auth.user.id == 1){
        await next()
      }
    }catch(error){
      response.status(401).json({message:"Sin permisos"})
    }
    
  }
  
}

module.exports = CheckUser
