'use strict'

const User = use('App/Models/User')

class UserController {
    async registro ({request, response}){
        const objeto = await request.all()
        const user = new User();
        user.username = objeto.username;
        user.password = objeto.password;
        user.email = objeto.email;
        try{
            const data = await user.save();
            if(data)
                return response.status(201).json(user);
            return response.status(400).json({mensaje:"Datos no validos"});
        }catch(error){
            return response.status(400).json({mensaje:"Datos no validos",user});
        } 
    }

    async login ({auth,request,response}){
        const {email, password} = await request.all();
        const datos = await request.all();
        
        try{
            const token = await auth.attempt(email, password);
            //datos.adonistoken = token;
            if(token) 
                return response.status(201).json(token.token);
            return response.status(400).json({mensaje:"Datos no validos"});
        }catch(error){
            return response.status(400).json({mensaje:"Datos no validoss"});
        } 
    }
    async logout ({auth,response,request}){
             
        try{
            //const req = await request.all()
            const apiToken = await auth.user;
            //const apiToken = await auth.
            await auth.authenticator('api').revokeTokens([apiToken])                
                return response.status(201).json({message:"La sesion se ha cerrado",Usuario:apiToken})
        }   
        catch(error){
            return response.status(400).json({mensaje:"Datos no validoss",error:error})
        } 
    }

    async consumir({auth,response,request}){
        try{
            const usuarios = await User.all()
                return response.status(200).json({usuarios})
        }catch(error){
            return response.status(400).json({mensaje:"Datos no validoss",error:error})
        }
    }
    async prueba({response, request}){
        const datos = await request.all()
        return response.status(200).json({message:datos,message2:"Hola"})
    }
}

module.exports = UserController
