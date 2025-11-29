import { Resend } from 'resend';

const FROM_EMAIL = 'AceSynergi <onboarding@resend.dev>';
const ADMIN_EMAIL = 'emmanuel012k@gmail.com';

function getResendClient() {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    throw new Error('RESEND_API_KEY environment variable is not set');
  }
  return new Resend(apiKey);
}

export async function sendContactEmail(data: {
  name: string;
  email: string;
  phone?: string;
  subject?: string;
  message: string;
}) {
  const client = getResendClient();
  
  const timestamp = new Date().toLocaleString('en-US', { 
    timeZone: 'America/Los_Angeles',
    dateStyle: 'full',
    timeStyle: 'long'
  });

  const adminHtmlContent = `
<div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
  <h2 style="color: #1E40AF; border-bottom: 3px solid #06B6D4; padding-bottom: 10px;">
    New Contact Form Submission
  </h2>
  
  <div style="background: #F8FAFC; padding: 20px; border-radius: 8px; margin: 20px 0;">
    <p><strong style="color: #1E40AF;">Name:</strong> ${data.name}</p>
    <p><strong style="color: #1E40AF;">Email:</strong> <a href="mailto:${data.email}">${data.email}</a></p>
    <p><strong style="color: #1E40AF;">Phone:</strong> ${data.phone || 'Not provided'}</p>
    <p><strong style="color: #1E40AF;">Subject:</strong> ${data.subject || 'Not provided'}</p>
  </div>
  
  <div style="margin: 20px 0;">
    <h3 style="color: #1E40AF;">Message:</h3>
    <p style="background: white; padding: 15px; border-left: 4px solid #06B6D4; border-radius: 4px;">
      ${data.message.replace(/\n/g, '<br>')}
    </p>
  </div>
  
  <p style="color: #6B7280; font-size: 14px; margin-top: 30px; padding-top: 20px; border-top: 1px solid #E5E7EB;">
    Submitted: ${timestamp}
  </p>
</div>
  `;

  const userConfirmationHtml = `
<div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
  <div style="background: linear-gradient(135deg, #1E40AF 0%, #06B6D4 100%); padding: 30px; text-align: center; border-radius: 8px 8px 0 0;">
    <h1 style="color: white; margin: 0; font-size: 28px;">AceSynergi</h1>
    <p style="color: rgba(255,255,255,0.9); margin: 10px 0 0 0;">Professional Training Solutions</p>
  </div>
  
  <div style="background: white; padding: 30px; border: 1px solid #E5E7EB; border-top: none; border-radius: 0 0 8px 8px;">
    <h2 style="color: #1E40AF; margin-top: 0;">Thank You for Contacting Us, ${data.name}!</h2>
    
    <p style="color: #374151; line-height: 1.6;">
      We have received your message and our team will get back to you within 24-48 hours.
    </p>
    
    <div style="background: #F8FAFC; padding: 20px; border-radius: 8px; margin: 20px 0;">
      <h3 style="color: #1E40AF; margin-top: 0;">Your Submission Details:</h3>
      <p style="color: #374151; margin: 5px 0;"><strong>Subject:</strong> ${data.subject || 'General Inquiry'}</p>
      <p style="color: #374151; margin: 5px 0;"><strong>Message:</strong></p>
      <p style="color: #6B7280; font-style: italic; margin: 5px 0;">"${data.message}"</p>
    </div>
    
    <p style="color: #374151; line-height: 1.6;">
      In the meantime, feel free to explore our courses and training programs at 
      <a href="https://acesynergi.com" style="color: #1E40AF;">acesynergi.com</a>.
    </p>
    
    <hr style="border: none; border-top: 1px solid #E5E7EB; margin: 30px 0;">
    
    <p style="color: #6B7280; font-size: 14px; margin-bottom: 0;">
      Best regards,<br>
      <strong style="color: #1E40AF;">The AceSynergi Team</strong>
    </p>
  </div>
</div>
  `;

  console.log('Sending contact form emails...');
  console.log('Admin email:', ADMIN_EMAIL);
  console.log('User email:', data.email);

  // Send email to admin
  try {
    const adminResult = await client.emails.send({
      from: FROM_EMAIL,
      to: ADMIN_EMAIL,
      subject: `New Contact Form Submission - ${data.name}`,
      html: adminHtmlContent,
    });
    console.log('Admin email result:', JSON.stringify(adminResult, null, 2));
  } catch (adminError: any) {
    console.error('Admin email error:', adminError?.message || adminError);
  }

  // Send confirmation email to user (may fail on Resend free tier - that's OK)
  try {
    const userResult = await client.emails.send({
      from: FROM_EMAIL,
      to: data.email,
      subject: `Thank You for Contacting AceSynergi - We'll Be in Touch Soon!`,
      html: userConfirmationHtml,
    });
    console.log('User email result:', JSON.stringify(userResult, null, 2));
    return { success: true, userEmailSent: true };
  } catch (userError: any) {
    // On Resend free tier, user emails to non-verified addresses will fail
    // This is expected - admin still gets the notification
    console.log('User confirmation email skipped (Resend free tier limitation):', userError?.message);
    return { success: true, userEmailSent: false };
  }
}

export async function sendCorporateEmail(data: {
  name: string;
  email: string;
  phone?: string;
  comment?: string;
}) {
  const client = getResendClient();
  
  const timestamp = new Date().toLocaleString('en-US', { 
    timeZone: 'America/Los_Angeles',
    dateStyle: 'full',
    timeStyle: 'long'
  });

  const adminHtmlContent = `
<div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
  <h2 style="color: #1E40AF; border-bottom: 3px solid #06B6D4; padding-bottom: 10px;">
    New Corporate Training Inquiry
  </h2>
  
  <div style="background: #F8FAFC; padding: 20px; border-radius: 8px; margin: 20px 0;">
    <p><strong style="color: #1E40AF;">Contact Person:</strong> ${data.name}</p>
    <p><strong style="color: #1E40AF;">Email:</strong> <a href="mailto:${data.email}">${data.email}</a></p>
    <p><strong style="color: #1E40AF;">Phone:</strong> ${data.phone || 'Not provided'}</p>
  </div>
  
  ${data.comment ? `
  <div style="margin: 20px 0;">
    <h3 style="color: #1E40AF;">Comment/Message:</h3>
    <p style="background: white; padding: 15px; border-left: 4px solid #06B6D4; border-radius: 4px;">
      ${data.comment.replace(/\n/g, '<br>')}
    </p>
  </div>
  ` : ''}
  
  <p style="color: #6B7280; font-size: 14px; margin-top: 30px; padding-top: 20px; border-top: 1px solid #E5E7EB;">
    Submitted: ${timestamp}
  </p>
</div>
  `;

  const userConfirmationHtml = `
<div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
  <div style="background: linear-gradient(135deg, #1E40AF 0%, #06B6D4 100%); padding: 30px; text-align: center; border-radius: 8px 8px 0 0;">
    <h1 style="color: white; margin: 0; font-size: 28px;">AceSynergi</h1>
    <p style="color: rgba(255,255,255,0.9); margin: 10px 0 0 0;">Corporate Training Solutions</p>
  </div>
  
  <div style="background: white; padding: 30px; border: 1px solid #E5E7EB; border-top: none; border-radius: 0 0 8px 8px;">
    <h2 style="color: #1E40AF; margin-top: 0;">Thank You for Your Interest, ${data.name}!</h2>
    
    <p style="color: #374151; line-height: 1.6;">
      We have received your corporate training inquiry. Our dedicated team will review your requirements and reach out within 24 hours.
    </p>
    
    <div style="background: #F8FAFC; padding: 20px; border-radius: 8px; margin: 20px 0;">
      <h3 style="color: #1E40AF; margin-top: 0;">What Happens Next?</h3>
      <ul style="color: #374151; line-height: 1.8; padding-left: 20px;">
        <li>Our training specialist will contact you within 24 hours</li>
        <li>We'll discuss your organization's specific training needs</li>
        <li>You'll receive a customized training proposal</li>
        <li>We'll schedule a consultation at your convenience</li>
      </ul>
    </div>
    
    ${data.comment ? `
    <div style="background: #FEF3C7; padding: 15px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #F59E0B;">
      <p style="color: #92400E; margin: 0;"><strong>Your Message:</strong></p>
      <p style="color: #78350F; font-style: italic; margin: 10px 0 0 0;">"${data.comment}"</p>
    </div>
    ` : ''}
    
    <p style="color: #374151; line-height: 1.6;">
      In the meantime, explore our comprehensive course catalog at 
      <a href="https://acesynergi.com" style="color: #1E40AF;">acesynergi.com</a>.
    </p>
    
    <hr style="border: none; border-top: 1px solid #E5E7EB; margin: 30px 0;">
    
    <p style="color: #6B7280; font-size: 14px; margin-bottom: 0;">
      Best regards,<br>
      <strong style="color: #1E40AF;">The AceSynergi Corporate Training Team</strong>
    </p>
  </div>
</div>
  `;

  console.log('Sending corporate training emails...');
  console.log('Admin email:', ADMIN_EMAIL);
  console.log('User email:', data.email);

  // Send email to admin
  try {
    const adminResult = await client.emails.send({
      from: FROM_EMAIL,
      to: ADMIN_EMAIL,
      subject: `New Corporate Training Inquiry - ${data.name}`,
      html: adminHtmlContent,
    });
    console.log('Corporate admin email result:', JSON.stringify(adminResult, null, 2));
  } catch (adminError: any) {
    console.error('Corporate admin email error:', adminError?.message || adminError);
  }

  // Send confirmation email to user (may fail on Resend free tier - that's OK)
  try {
    const userResult = await client.emails.send({
      from: FROM_EMAIL,
      to: data.email,
      subject: `Thank You for Your Corporate Training Inquiry - AceSynergi`,
      html: userConfirmationHtml,
    });
    console.log('Corporate user email result:', JSON.stringify(userResult, null, 2));
    return { success: true, userEmailSent: true };
  } catch (userError: any) {
    // On Resend free tier, user emails to non-verified addresses will fail
    // This is expected - admin still gets the notification
    console.log('Corporate user confirmation email skipped (Resend free tier limitation):', userError?.message);
    return { success: true, userEmailSent: false };
  }
}
