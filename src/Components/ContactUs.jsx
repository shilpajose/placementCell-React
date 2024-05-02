import React from 'react'
import {useRef} from 'react'
import emailjs from '@emailjs/browser';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, toast } from 'react-toastify';

function ContactUs() {

    const form=useRef()

    const sendEmail = (e) => {
        e.preventDefault();
    
        emailjs.sendForm('service_vlf0mzl', 'template_rozukk7', form.current, 'NOSgb6npkpvV9vvA-')
          .then((result) => {
              console.log(result.text);
              toast.success('Your mail has been sent')
          }, (error) => {
              console.log(error.text);
          });
          e.target.reset()
      };
    return (
        <div>

            <div className='container w-50 p-5' style={{fontFamily:'roboto'}}>
                <form ref={form} onSubmit={sendEmail}>
                    <h2 className='text-center text-danger'>Contact Us</h2>
                    <div className='mt-2'>
                        <input type="text" placeholder='Full Name' className='form-control' id='name' name='user_name'/>
                    </div>
                    <div className='mt-2'>
                        <input type="email" placeholder='Enter your Email Address' className='form-control' id='user_email' name='user_email'/>
                    </div>
                    <div className='mt-2'>
                        <input type="text" placeholder='Subject' className='form-control' id='subject' name='subject'/>
                    </div>
                    <div className='mt-2'>
                        <textarea cols="30" rows="10" placeholder='Enter Your Message' className='form-control' id='message' name='message'></textarea>
                    </div>
                    <div className='mt-2 text-center'>
                        <button className='btn btn-danger'>Send</button>
                    </div>
                </form>
                
            </div>
            <ToastContainer position='top-center' theme='colored' autoClose={3000} />
        </div>
    )
}

export default ContactUs