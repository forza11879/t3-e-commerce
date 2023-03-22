import React, { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from 'next/router';
import { Modal } from "antd";

function RegisterPage() {
    const [email, setEmail] = useState("");
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [disabled, setDisabled] = useState(false);
    const router = useRouter();

    const showModal = () => {
        setIsModalOpen(true);
    };

    const handleOk = () => {
        setIsModalOpen(false);
    };

    const clickEventHandler = async () => {
        setIsModalOpen(false);
        await router.push(`/`);
    };

    const handleCancel = () => {
        return void clickEventHandler();
    };

    const handleSignIn = async (e: React.SyntheticEvent): Promise<void> => {
        e.preventDefault();
        try {
            setDisabled(true);
            const signInResponse = await signIn("email", {
                email,
                redirect: false,
                callbackUrl: `${window.location.origin}/auth/confirm-request`,
            });
            console.log("signInResponseee: ", signInResponse);

            if (signInResponse?.error) {
                throw new Error(signInResponse?.error);
            }
            showModal();


        } catch (error) {
            console.log(error);
        } finally {
            setDisabled(false);
        }
    };

    const registerForm = () => (
        // eslint-disable-next-line @typescript-eslint/no-misused-promises
        <form onSubmit={handleSignIn}>
            <input
                type="email"
                className="form-control"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Your email"
                disabled={disabled}
                autoFocus
            />
            <br />
            <button type="submit" className="btn btn-raised" disabled={disabled}>
                {disabled ? "Loading..." : "Sign in"}
            </button>
        </form>
    );
    return (
        <div className="container p-5">
            <div className="row">
                <div className="col-md-6 offset-md-3">
                    <h4>Register</h4>
                    {registerForm()}
                    <Modal
                        title="Basic Modal"
                        open={isModalOpen}
                        onOk={handleOk}
                        onCancel={handleCancel}
                    >
                        <div className="fixed inset-0 z-10 bg-white bg-opacity-90 backdrop-blur-md backdrop-grayscale backdrop-filter">
                            <div className="animate-zoomIn flex min-h-screen flex-col items-center justify-center px-6">
                                <div className="flex max-w-sm flex-col items-center justify-center text-center">
                                    <h3 className="mt-2 text-2xl font-semibold">
                                        Confirm your email
                                    </h3>
                                    <p className="mt-4 text-lg">
                                        We emailed a magic link to <strong>{email}</strong>. Check
                                        your inbox and click the link in the email to login.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </Modal>
                </div>
            </div>
        </div>
    );
}

export default RegisterPage;

