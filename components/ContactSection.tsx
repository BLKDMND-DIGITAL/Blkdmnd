
import React, { useState, useEffect, useRef } from 'react';

const ContactSection: React.FC = () => {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState('');
  const [formStep, setFormStep] = useState(0); // 0: initial, 1: name/email, 2: message
  const nameRef = useRef<HTMLInputElement>(null);
  const messageRef = useRef<HTMLTextAreaElement>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    // Focus the first input when it becomes visible
    if (formStep === 1 && nameRef.current) {
      nameRef.current.focus();
    }
    // Focus the textarea when it becomes visible
    if (formStep === 2 && messageRef.current) {
      messageRef.current.focus();
    }
  }, [formStep]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (formStep === 0) {
      setFormStep(1);
      return;
    }

    if (formStep === 1) {
      // In a real app, you'd use a more robust validation library
      if (formData.name.trim() === '' || !formData.email.match(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g)) {
        alert('Please enter a valid name and email.');
        return;
      }
      setFormStep(2);
      return;
    }

    // On formStep === 2, this is the final submission
    if(formData.message.trim() === '') {
        alert('Please enter a message.');
        return;
    }
    
    setStatus('Thank you for your message! I will get back to you shortly.');
    setFormData({ name: '', email: '', message: '' });
    setFormStep(0); // Reset form state
    setTimeout(() => setStatus(''), 5000);
  };
  
  const calendarUrl = "https://calendar.google.com/calendar/embed?src=b54eb00375e7dab0c1eef362eae292c66a29088e19b56049184eb98c963b6b58%40group.calendar.google.com&ctz=America%2FNew_York";

  return (
    <section id="contact" className="py-16 md:py-24 scroll-mt-20">
      <div className="text-center">
        <h2 className="text-3xl font-bold mb-4">Get In Touch</h2>
        <p className="max-w-2xl mx-auto text-light-text-secondary dark:text-dark-text-secondary mb-8">
          Have a project in mind or want to connect? Feel free to send me a message or book a meeting.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="max-w-xl mx-auto">
        <div className="space-y-6">
            <div className={`grid transition-all duration-500 ease-in-out ${formStep >= 1 ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'}`}>
                <div className="overflow-hidden space-y-6">
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium mb-2">Name</label>
                      <input ref={nameRef} type="text" name="name" id="name" required={formStep >= 1} value={formData.name} onChange={handleChange} className="w-full px-4 py-2 bg-light-bg-secondary dark:bg-dark-bg-secondary rounded-xl border border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-primary focus:outline-none transition" />
                    </div>
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium mb-2">Email</label>
                      <input type="email" name="email" id="email" required={formStep >= 1} value={formData.email} onChange={handleChange} className="w-full px-4 py-2 bg-light-bg-secondary dark:bg-dark-bg-secondary rounded-xl border border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-primary focus:outline-none transition" />
                    </div>
                </div>
            </div>
            
            <div className={`grid transition-all duration-500 ease-in-out ${formStep >= 2 ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'}`}>
              <div className="overflow-hidden">
                <div>
                  <label htmlFor="message" className="block text-sm font-medium mb-2">Message</label>
                  <textarea 
                    ref={messageRef} 
                    name="message" 
                    id="message" 
                    required={formStep >= 2}
                    rows={5} 
                    value={formData.message} 
                    onChange={handleChange} 
                    className="w-full px-4 py-2 bg-light-bg-secondary dark:bg-dark-bg-secondary rounded-xl border border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-primary focus:outline-none transition"
                  />
                </div>
              </div>
            </div>
        </div>
        
        <div className="pt-8 flex flex-col sm:flex-row gap-4 justify-center">
          <button type="submit" className="flex-1 px-8 py-3 bg-primary text-white font-semibold rounded-xl hover:bg-primary-dark transition-colors">
            Contact me Now
          </button>
          <a
            href={calendarUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 text-center px-8 py-3 border border-primary text-primary font-semibold rounded-xl hover:bg-primary/10 transition-colors"
          >
            Schedule a Meeting
          </a>
        </div>
        {status && <p className="text-center text-green-600 mt-4">{status}</p>}
      </form>
    </section>
  );
};

export default ContactSection;
