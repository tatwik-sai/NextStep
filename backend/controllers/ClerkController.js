import { verifyWebhook } from '@clerk/express/webhooks' 
import DBUser from '../models/UsersModel.js';

export const onUserChange = async (req, res) => {
    // Verify and process the webhook event
    try {
      const evt = await verifyWebhook(req)
  

      const { id, email_addresses, first_name, last_name, image_url } = evt.data
      const eventType = evt.type

      if(eventType === "user.created") {
        try {
            await DBUser.create({
            _id: id,
            email: email_addresses[0].email_address,
            firstName: first_name,
            lastName: last_name,
            imageUrl: image_url,
            })

        } catch (error) {
            console.log(error);
            return res.status(400).send('Error in creating user')
        }
        
    } else if(eventType === "user.updated") {
        try {
            await DBUser.findByIdAndUpdate(id, {
                firstName: first_name,
                lastName: last_name,
                imageUrl: image_url,
            })
        } catch (error) {
            return res.status(400).send('Error in updating user')
        }
    } else if(eventType === "user.deleted") {
        try {
            await DBUser.findByIdAndDelete(id)
        } catch (error) {
            return res.status(400).send('Error in deleting user')
        }
    }
      console.log('Webhook event processed:', evt)
      return res.status(201).send('New user created')
    } catch (err) {
      console.error('Error:', err)
      return res.status(400).send('Error in onSignup')
    }
}


