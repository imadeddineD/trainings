"use client"
import { Suspense, useState } from 'react';
import emailjs from '@emailjs/browser';
import {Goldman} from "next/font/google"
import { usePathname } from 'next/navigation';
import ScrollToTop from '@/components/ScrollToTop';
import Header from '@/components/Header';
import Footer from '@/components/Footer';


const inter = Goldman({ subsets: ["latin"] , weight:['400','700']});

const offices = [
    {title: "London Office Info", number: "00447737137773", email: "info@eptce.com", location: "Oxford Street - Portman Building - Postcode WIH 6DU - London - The UK"},
    {title: "Riyadh Office Info", number: "+966 53 436 7818", email: "Riyadh@eptce.com", location: "RRRB2674, 6565 King Abdulaziz Rd, 2674, Riyadh 13338, Saudi Arabia"},
    {title: "Dubai Office Info", number: "+971588853992", email: "Dubai@eptce.com", location: "Boulevard Plaza - Tower 2 Sheikh Mohammed bin Rashid Blvd - Downtown Dubai - Dubai - United Arab Emirates"},
    {title: "Frankfort Office Info", number: "+49 1573 3484044", email: "frankfort@eptce.com", location: "Bockenheimer Landstraße 2-4/16th Floor, 60306 Frankfurt am Main, Germany"},
    {title: "Damascus Office Info", number: "+963982056717", email: "Damas@eptce.com", location: "Kaisar Palace, 3 Maysaloon, Damascus, Syria"},
]

const Contact = () => {
    const [formData, setFormData] = useState<any>({
        name: '',
        email: '',
        number: '',
        company: '',
        comment: ''
    });
    const [isSubmitting, setIsSubmitting] = useState<any>(false);
    const [submitStatus, setSubmitStatus] = useState<any>(null);

       const pathnamee = usePathname();
            const hideHeaderFooter = pathnamee === '/pdf';

    const handleInputChange = (e:any) => {
        const { name, value } = e.target;
        setFormData((prev:any) => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e:any) => {
        e.preventDefault();
        setIsSubmitting(true);
        setSubmitStatus(null);

        // Basic validation
        if (!formData.name || !formData.email || !formData.number) {
            setSubmitStatus('error');
            setIsSubmitting(false);
            alert('Please fill in all required fields (Name, Email, Phone Number)');
            return;
        }

        // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(formData.email)) {
            setSubmitStatus('error');
            setIsSubmitting(false);
            alert('Please enter a valid email address');
            return;
        }        try {
            // EmailJS configuration from environment variables
            
            // const serviceId = VITE_EMAILJS_SERVICE_ID;
            // const templateId = VITE_EMAILJS_TEMPLATE_ID;
            // const publicKey = VITE_EMAILJS_PUBLIC_KEY;
            const serviceId = "";
            const templateId = "";
            const publicKey = "";

            // Check if EmailJS is configured
            if (!serviceId || !templateId || !publicKey || 
                serviceId === 'service_eptce123' || 
                templateId === 'template_eptce123' || 
                publicKey === 'YOUR_PUBLIC_KEY_HERE') {
                throw new Error('EmailJS is not properly configured. Please set up your EmailJS credentials in the .env file.');
            }

            const templateParams = {
                to_email: 'noor_mamoun@yahoo.com',
                from_name: formData.name,
                from_email: formData.email,
                phone_number: formData.number,
                company: formData.company || 'Not specified',
                message: formData.comment || 'No additional comments provided',
                reply_to: formData.email
            };

            await emailjs.send(serviceId, templateId, templateParams, publicKey);
            
            setSubmitStatus('success');
            setFormData({
                name: '',
                email: '',
                number: '',
                company: '',
                comment: ''
            });
            alert('Thank you! Your message has been sent successfully.');
        } catch (error:any) {
            console.error('EmailJS Error:', error);
            setSubmitStatus('error');
            if (error.message.includes('EmailJS is not properly configured')) {
                alert('Email service is not configured yet. Please contact us directly using the information below.');
            } else {
                alert('Sorry, there was an error sending your message. Please try again or contact us directly.');
            }        } finally {
            setIsSubmitting(false);
        }
    };

  return (
    <>
     <ScrollToTop />

      {!hideHeaderFooter && <Header />}
    <main>
    <Suspense fallback={<div className="text-center py-20 font-goldman">Loading...</div>}>
    <div className="max-w-screen-2xl mx-auto font-arial">
        <section className="container-px bg-[#F2F2F2] py-[50px]">
            <h1 className={`${inter.className} font-goldman text-center mb-10 xs:text-[30px] text-[24px]`}>We are just a click away</h1>
            <form className="w-full" onSubmit={handleSubmit}>
                <div className="grid lg:grid-cols-7 gap-7 mb-10">
                    <div className="grid lg:grid-cols-1 sm:grid-cols-2 gap-7 lg:col-span-3">
                        <input 
                            className={`placeholder:${inter.className}  p-3 border border-gray-300 rounded`} 
                            type="text" 
                            name="name" 
                            value={formData.name}
                            onChange={handleInputChange}
                            placeholder="Full name *" 
                            required
                        />
                        <input 
                            className={`placeholder:${inter.className}  p-3 border border-gray-300 rounded`} 
                            type="email" 
                            name="email" 
                            value={formData.email}
                            onChange={handleInputChange}
                            placeholder="Email Address *" 
                            required
                        />
                        <input 
                            className={`placeholder:${inter.className}  p-3 border border-gray-300 rounded`} 
                            type="tel" 
                            name="number" 
                            value={formData.number}
                            onChange={handleInputChange}
                            placeholder="Phone Number *" 
                            required
                        />
                        <input 
                            className={`placeholder:${inter.className}  p-3 border border-gray-300 rounded`} 
                            type="text" 
                            name="company" 
                            value={formData.company}
                            onChange={handleInputChange}
                            placeholder="Company" 
                        />
                    </div>
                    <textarea 
                        className={`placeholder:${inter.className} resize-none lg:col-span-4 p-3  min-h-[200px] border border-gray-300 rounded`} 
                        name="comment" 
                        value={formData.comment}
                        onChange={handleInputChange}
                        placeholder="Comment"
                    ></textarea>
                </div>
                <button 
                    className={`btn-[#FAD425] !rounded-none !text-[20px] !px-12 mx-auto block transition-opacity ${isSubmitting ? 'opacity-50 cursor-not-allowed' : ''}`} 
                    type="submit"
                    disabled={isSubmitting}
                >
                    {isSubmitting ? 'Sending...' : 'Submit'}
                </button>
            </form>
        </section>

        <section className="container-px group pt-[60px] md:pb-[70px] pb-[30px] font-goldman">
            <div>
                <h2 className="ml-20 w-fit relative after:content-[''] after:absolute after:w-1/2 after:h-[3px] after:bg-red after:bottom-0 after:left-0
                 pb-[7px] text-[20px] group-hover:after:w-full after:transition-all duration-1000 uppercase mb-16">CONtACT INFO</h2>
            </div>

            <div className="ps-4 max-xs:text-[14px]">
                {offices.map(({title, number, email, location}, i) => (
                    <div className="flex items-center gap-8 mb-12" key={title + i}>
                        <div>
                            <h4 className="capitalize [writing-mode:vertical-rl] rotate-180 text-[#F4A827]">{title}</h4>
                        </div>
                        <div className={`p-6 max-xs:ps-0 max-xs:pe-4 pt-0 flex flex-col gap-4 border-b border-[#B7B0B0] ${i === offices.length -1 ? "border-b-0" : ""} min-w-[80%]`}>
                            <div className="flex items-start gap-3">
                                <img src="imgs/Contact/whatsapp-icon.svg" alt="whatsapp" loading="lazy" />
                                <h6>{number}</h6>
                            </div>
                            <div className="flex items-start gap-3 ps-[5px]">
                                <img className="pt-1" src="imgs/Contact/email-icon.svg" alt="email" loading="lazy" />
                                <h6 className="ps-[5px]">{email}</h6>
                            </div>
                            <div className="flex items-start gap-3 max-w-[700px]">
                                <img src="imgs/Contact/location-icon.svg" alt="location" loading="lazy" />
                                <h6>{location}</h6>
                            </div>
                            <div className="flex items-start gap-3 ps-1">
                                <img src="imgs/Contact/phone-icon.svg" alt="phone" loading="lazy" />
                                <h6>{number}</h6>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    </div>
    </Suspense>
    </main>
     {!hideHeaderFooter && <Footer />}
    </>
  )
}

export default Contact