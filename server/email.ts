import { Resend } from 'resend';

// =============================================================================
// RESEND FREE TIER LIMITATIONS (LOCAL TESTING):
// =============================================================================
// - You can ONLY send emails TO the email address that owns the Resend account
// - The FROM address MUST be "onboarding@resend.dev" on free tier
// - To send to any recipient, you need a verified custom domain in Resend
// =============================================================================

// From address - on free tier, MUST be "onboarding@resend.dev"
const FROM_EMAIL = 'Acesynergi <onboarding@resend.dev>';

// Admin email - MUST be the Resend account owner email on free tier
// Change this to YOUR Resend account email for local testing
// const ADMIN_EMAIL = 'reachus@acesynergi.com';
const ADMIN_EMAIL = 'emmanuel012k@gmail.com';
// Cache the Resend client
let resendClient: Resend | null = null;

function getResendClient(): Resend {
  if (resendClient) return resendClient;
  
  const apiKey = process.env.RESEND_API_KEY;
  
  console.log('\n' + '='.repeat(60));
  console.log('[Email] INITIALIZING RESEND CLIENT');
  console.log('='.repeat(60));
  
  if (!apiKey) {
    console.error('[Email] ❌ RESEND_API_KEY is NOT SET!');
    console.error('[Email] Please create a .env file in the project root with:');
    console.error('[Email]   RESEND_API_KEY=re_your_api_key_here');
    console.error('[Email] Get your API key from: https://resend.com/api-keys');
    console.log('='.repeat(60) + '\n');
    throw new Error('RESEND_API_KEY environment variable is not set');
  }
  
  console.log('[Email] ✓ API Key found:', apiKey.substring(0, 10) + '...');
  console.log('[Email] ✓ FROM_EMAIL:', FROM_EMAIL);
  console.log('[Email] ✓ ADMIN_EMAIL:', ADMIN_EMAIL);
  console.log('[Email]');
  console.log('[Email] ⚠️  RESEND FREE TIER: Emails can only be sent TO:', ADMIN_EMAIL);
  console.log('='.repeat(60) + '\n');
  
  resendClient = new Resend(apiKey);
  return resendClient;
}

// Log startup config when module loads
console.log('\n[Email] Module loaded - waiting for first email request to initialize...');

/**
 * Send email to admin and log results to console
 */
async function sendAdminEmail(
  client: Resend,
  subject: string,
  html: string,
  formType: string
): Promise<{ success: boolean; id?: string; error?: string }> {
  console.log('\n' + '-'.repeat(50));
  console.log(`[Email] 📧 Sending ${formType} email to admin...`);
  console.log(`[Email] TO: ${ADMIN_EMAIL}`);
  console.log(`[Email] FROM: ${FROM_EMAIL}`);
  console.log(`[Email] SUBJECT: ${subject}`);
  console.log('-'.repeat(50));

  try {
    const startTime = Date.now();
    const response = await client.emails.send({
      from: FROM_EMAIL,
      to: ADMIN_EMAIL,
      subject: subject,
      html: html,
    });
    const duration = Date.now() - startTime;

    console.log(`[Email] Response received in ${duration}ms`);
    console.log('[Email] Full response:', JSON.stringify(response, null, 2));

    // Check for Resend error
    if (response.error) {
      console.error('\n[Email] ❌ ADMIN EMAIL FAILED!');
      console.error('[Email] Error name:', response.error.name);
      console.error('[Email] Error message:', response.error.message);
      
      // Common Resend free tier error
      if (response.error.message?.includes('only send testing emails')) {
        console.error('\n[Email] 💡 FREE TIER ISSUE: You can only send to your Resend account email');
        console.error('[Email] Make sure ADMIN_EMAIL matches your Resend account email');
      }
      
      return {
        success: false,
        error: response.error.message || 'Unknown Resend error'
      };
    }

    // Success
    if (response.data?.id) {
      console.log('\n[Email] ✅ ADMIN EMAIL SENT SUCCESSFULLY!');
      console.log(`[Email] Email ID: ${response.data.id}`);
      return { success: true, id: response.data.id };
    }

    console.error('[Email] ⚠️ Unexpected response format (no data.id)');
    return { success: false, error: 'Unexpected response from Resend' };

  } catch (err: any) {
    console.error('\n[Email] ❌ EXCEPTION while sending admin email:');
    console.error('[Email] Error:', err?.message || err);
    return {
      success: false,
      error: err?.message || 'Failed to send email'
    };
  }
}

/**
 * Contact Form Email (from Contact page or Talk to Advisor)
 */
export async function sendContactEmail(data: {
  name: string;
  email: string;
  phone?: string;
  subject?: string;
  message: string;
  type?: string; // "contact" or "course_inquiry" (from advisor form)
}): Promise<{ success: boolean; error?: string }> {
  
  console.log('\n' + '='.repeat(60));
  console.log('[Email] 📬 CONTACT FORM SUBMISSION');
  console.log('='.repeat(60));
  console.log('[Email] Name:', data.name);
  console.log('[Email] Email:', data.email);
  console.log('[Email] Phone:', data.phone || 'Not provided');
  console.log('[Email] Subject:', data.subject || 'Not provided');
  console.log('[Email] Type:', data.type || 'contact');
  console.log('[Email] Message preview:', data.message.substring(0, 100) + (data.message.length > 100 ? '...' : ''));
  console.log('='.repeat(60));

  const client = getResendClient();
  
  const timestamp = new Date().toLocaleString('en-US', { 
    timeZone: 'Asia/Kolkata',
    dateStyle: 'full',
    timeStyle: 'long'
  });

  // Determine form source for email subject
  const formSource = data.type === 'course_inquiry' 
    ? 'Talk to Our Advisor (Course Inquiry)' 
    : 'Contact Form';

  const adminHtmlContent = `
<div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; border: 1px solid #E5E7EB; border-radius: 8px; overflow: hidden;">
  <div style="background: linear-gradient(135deg, #1E40AF 0%, #06B6D4 100%); padding: 20px; text-align: center;">
    <h1 style="color: white; margin: 0; font-size: 24px;">AceSynergi</h1>
    <p style="color: rgba(255,255,255,0.9); margin: 5px 0 0 0; font-size: 14px;">New Form Submission</p>
  </div>
  
  <div style="padding: 24px;">
    <div style="background: #FEF3C7; border-left: 4px solid #F59E0B; padding: 12px 16px; margin-bottom: 20px; border-radius: 4px;">
      <strong style="color: #92400E;">📧 Form Source:</strong>
      <span style="color: #78350F; margin-left: 8px;">${formSource}</span>
    </div>

    <h2 style="color: #1E40AF; border-bottom: 2px solid #06B6D4; padding-bottom: 10px; margin-top: 0;">
      Contact Details
    </h2>
    
    <table style="width: 100%; border-collapse: collapse;">
      <tr>
        <td style="padding: 8px 0; color: #6B7280; width: 120px;"><strong>Name:</strong></td>
        <td style="padding: 8px 0; color: #111827;">${data.name}</td>
      </tr>
      <tr>
        <td style="padding: 8px 0; color: #6B7280;"><strong>Email:</strong></td>
        <td style="padding: 8px 0;"><a href="mailto:${data.email}" style="color: #1E40AF;">${data.email}</a></td>
      </tr>
      <tr>
        <td style="padding: 8px 0; color: #6B7280;"><strong>Phone:</strong></td>
        <td style="padding: 8px 0; color: #111827;">${data.phone || 'Not provided'}</td>
      </tr>
      <tr>
        <td style="padding: 8px 0; color: #6B7280;"><strong>Subject:</strong></td>
        <td style="padding: 8px 0; color: #111827;">${data.subject || 'General Inquiry'}</td>
      </tr>
    </table>
    
    <h3 style="color: #1E40AF; margin-top: 24px;">Message:</h3>
    <div style="background: #F8FAFC; padding: 16px; border-left: 4px solid #06B6D4; border-radius: 4px; color: #374151; line-height: 1.6;">
      ${data.message.replace(/\n/g, '<br>')}
    </div>
    
    <p style="color: #9CA3AF; font-size: 12px; margin-top: 24px; padding-top: 16px; border-top: 1px solid #E5E7EB;">
      Submitted: ${timestamp}
    </p>
  </div>
</div>
  `;

  const subject = data.type === 'course_inquiry'
    ? `[Advisor Request] ${data.name} - Course Inquiry`
    : `[Contact Form] ${data.name} - ${data.subject || 'New Message'}`;

  // Send to admin - this is the critical email
  const result = await sendAdminEmail(client, subject, adminHtmlContent, 'Contact');

  if (!result.success) {
    console.error('\n[Email] ❌ CONTACT FORM EMAIL FAILED - returning error to frontend');
    throw new Error(result.error || 'Failed to send email to admin');
  }

  console.log('\n[Email] ✅ CONTACT FORM PROCESSED SUCCESSFULLY');
  console.log('='.repeat(60) + '\n');
  
  return { success: true };
}

/**
 * Corporate Training Inquiry Email
 */
export async function sendCorporateEmail(data: {
  name: string;
  email: string;
  phone?: string;
  comment?: string;
}): Promise<{ success: boolean; error?: string }> {
  
  console.log('\n' + '='.repeat(60));
  console.log('[Email] 🏢 CORPORATE FORM SUBMISSION');
  console.log('='.repeat(60));
  console.log('[Email] Name:', data.name);
  console.log('[Email] Email:', data.email);
  console.log('[Email] Phone:', data.phone || 'Not provided');
  console.log('[Email] Comment preview:', (data.comment || '').substring(0, 100) + ((data.comment?.length || 0) > 100 ? '...' : '') || 'None');
  console.log('='.repeat(60));

  const client = getResendClient();
  
  const timestamp = new Date().toLocaleString('en-US', { 
    timeZone: 'Asia/Kolkata',
    dateStyle: 'full',
    timeStyle: 'long'
  });

  const adminHtmlContent = `
<div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; border: 1px solid #E5E7EB; border-radius: 8px; overflow: hidden;">
  <div style="background: linear-gradient(135deg, #1E40AF 0%, #06B6D4 100%); padding: 20px; text-align: center;">
    <h1 style="color: white; margin: 0; font-size: 24px;">AceSynergi</h1>
    <p style="color: rgba(255,255,255,0.9); margin: 5px 0 0 0; font-size: 14px;">Corporate Training Inquiry</p>
  </div>
  
  <div style="padding: 24px;">
    <div style="background: #DBEAFE; border-left: 4px solid #2563EB; padding: 12px 16px; margin-bottom: 20px; border-radius: 4px;">
      <strong style="color: #1E40AF;">🏢 Form Source:</strong>
      <span style="color: #1E3A8A; margin-left: 8px;">Corporate Training Page</span>
    </div>

    <h2 style="color: #1E40AF; border-bottom: 2px solid #06B6D4; padding-bottom: 10px; margin-top: 0;">
      Contact Details
    </h2>
    
    <table style="width: 100%; border-collapse: collapse;">
      <tr>
        <td style="padding: 8px 0; color: #6B7280; width: 120px;"><strong>Name:</strong></td>
        <td style="padding: 8px 0; color: #111827;">${data.name}</td>
      </tr>
      <tr>
        <td style="padding: 8px 0; color: #6B7280;"><strong>Email:</strong></td>
        <td style="padding: 8px 0;"><a href="mailto:${data.email}" style="color: #1E40AF;">${data.email}</a></td>
      </tr>
      <tr>
        <td style="padding: 8px 0; color: #6B7280;"><strong>Phone:</strong></td>
        <td style="padding: 8px 0; color: #111827;">${data.phone || 'Not provided'}</td>
      </tr>
    </table>
    
    ${data.comment ? `
    <h3 style="color: #1E40AF; margin-top: 24px;">Comment/Message:</h3>
    <div style="background: #F8FAFC; padding: 16px; border-left: 4px solid #06B6D4; border-radius: 4px; color: #374151; line-height: 1.6;">
      ${data.comment.replace(/\n/g, '<br>')}
    </div>
    ` : ''}
    
    <p style="color: #9CA3AF; font-size: 12px; margin-top: 24px; padding-top: 16px; border-top: 1px solid #E5E7EB;">
      Submitted: ${timestamp}
    </p>
  </div>
</div>
  `;

  const subject = `[Corporate Inquiry] ${data.name} - Training Request`;

  // Send to admin - this is the critical email
  const result = await sendAdminEmail(client, subject, adminHtmlContent, 'Corporate');

  if (!result.success) {
    console.error('\n[Email] ❌ CORPORATE FORM EMAIL FAILED - returning error to frontend');
    throw new Error(result.error || 'Failed to send email to admin');
  }

  console.log('\n[Email] ✅ CORPORATE FORM PROCESSED SUCCESSFULLY');
  console.log('='.repeat(60) + '\n');
  
  return { success: true };
}
