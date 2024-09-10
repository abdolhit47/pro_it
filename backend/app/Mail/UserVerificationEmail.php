<?php

namespace App\Mail;

use App\Models\User;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Mail\Mailable;
use Illuminate\Mail\Mailables\Content;
use Illuminate\Mail\Mailables\Envelope;
use Illuminate\Queue\SerializesModels;

class UserVerificationEmail extends Mailable
{
    use Queueable, SerializesModels;

    /**
     * Create a new message instance.
     */
    public function __construct(User $user, $type )
    {
        $this->user = $user;
        $this->type = $type;
    }

    public function build()
    {
        if($this->type == 'verifyemail'){
            return $this->view('emails.verification')
                ->subject('تأكيد البريد الإلكتروني')
                ->with([
                    'verificationUrl' => 'http://127.0.0.1:3000/'.$this->type.'/'.$this->user->id.'/' . $this->user->verification_token
                ]);
        }elseif ($this->type == 'resetpassword'){
            return $this->view('emails.resetpassword')
                ->subject('إعادة تعيين كلمة المرور')
                ->with([
                    'verificationUrl' => 'http://127.0.0.1:3000/'.$this->type.'/'.$this->user->id.'/' . $this->user->verification_token
                ]);
        }
    }

    /**
     * Get the message envelope.
     */
//    public function envelope(): Envelope
//    {
//        return new Envelope(
//            subject: 'User Verification Email',
//        );
//    }
//
//    /**
//     * Get the message content definition.
//     */
//    public function content(): Content
//    {
//        return new Content(
//            view: 'view.name',
//        );
//    }
//
//    /**
//     * Get the attachments for the message.
//     *
//     * @return array<int, \Illuminate\Mail\Mailables\Attachment>
//     */
//    public function attachments(): array
//    {
//        return [];
//    }
}
