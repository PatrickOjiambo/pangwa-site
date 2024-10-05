"use client";
import { FaPhone, FaEnvelope, FaFacebookF, FaLinkedin, FaInstagram } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { useState } from "react";
import Link from "next/link";

function Footer() {
    const [formData, setFormData] = useState({
        fullName: "",
        email: "",
        businessName: "",
        inquiryType: "Inquiry",
        message: "",
    });

    const [uploadedFile, setUploadedFile] = useState<File | null>(null);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        // Handle form submission (send the formData somewhere)
        console.log(formData);
    };
    async function submitContactForm(formData:
        {
            fullName: string,
            email: string,
            businessName: string,
            inquiryType: string,
            message: string
        }, uploadedFile: File) {
        try {
            // Create a new FormData object
            const data = new FormData();

            // Append form fields
            data.append("fullName", formData.fullName);
            data.append("email", formData.email);
            data.append("businessName", formData.businessName || ""); // Optional field
            data.append("inquiryType", formData.inquiryType);
            data.append("message", formData.message);

            // Append file if uploaded
            if (uploadedFile) {
                data.append("file", uploadedFile);
            }

            // Send a POST request to the /api/contact endpoint
            const response = await fetch("/api/contact", {
                method: "POST",
                body: data,
            });

            // Parse the JSON response
            const result = await response.json();

            // Handle success or failure
            if (response.ok && result.status === "success") {
                console.log("Form submitted successfully:", result);
                return { success: true, data: result };
            } else {
                console.error("Form submission failed:", result.error);
                return { success: false, error: result.error || "Unknown error occurred" };
            }
        } catch (error) {
            console.error("Error submitting the form:", error);
            return { success: false, error: error || "Network error" };
        }
    }

    const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            setUploadedFile(e.target.files[0]);
        }
        if (e.target.files && e.target.files[0]) {
            console.log("Uploaded file:", e.target.files[0]);
        }
    };

    return (
        <div className="bg-gray-900 text-gray-300 py-12 px-3">
            <div className="container mx-auto grid grid-cols-1 lg:grid-cols-2 gap-10">
                {/* Contact Information */}
                <div>
                    <h3 className="text-3xl font-bold text-white mb-4">Contact Us</h3>
                    <p className="mb-6 text-gray-400">
                        For further details about our services, availability, and inquiries,
                        feel free to contact us through the information below.
                    </p>
                    <div className="flex items-center mb-4">
                        <FaPhone className="text-white mr-3" />
                        <p>+254 123 456 789</p>
                    </div>
                    <div className="flex items-center mb-4">
                        <FaEnvelope className="text-white mr-3" />
                        <p>pangwacapitalemail@gmail.com</p>
                    </div>
                    <div className="flex items-center space-x-4">
                        <Link href="">
                            <FaFacebookF className="text-white cursor-pointer hover:text-gray-400" />
                        </Link>
                        <Link href="">
                            <FaXTwitter className="text-white cursor-pointer hover:text-gray-400" />
                        </Link>
                        <Link href="">
                            <FaLinkedin className="text-white cursor-pointer hover:text-gray-400" />
                        </Link>
                        <Link href="">
                            <FaInstagram className="text-white cursor-pointer hover:text-gray-400" />
                        </Link>
                    </div>
                </div>

                {/* Contact Form */}
                <div>
                    <h3 className="text-3xl font-bold text-white mb-4">Get in Touch</h3>
                    <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-6">
                        <input
                            type="text"
                            name="fullName"
                            placeholder="Full Name"
                            value={formData.fullName}
                            onChange={handleInputChange}
                            required
                            className="w-full p-3 bg-gray-800 text-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        />
                        <input
                            type="email"
                            name="email"
                            placeholder="Email Address"
                            value={formData.email}
                            onChange={handleInputChange}
                            required
                            className="w-full p-3 bg-gray-800 text-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        />
                        <input
                            type="text"
                            name="businessName"
                            placeholder="Business Name"
                            value={formData.businessName}
                            onChange={handleInputChange}
                            className="w-full p-3 bg-gray-800 text-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        />
                        <select
                            name="inquiryType"
                            value={formData.inquiryType}
                            onChange={handleInputChange}
                            className="w-full p-3 bg-gray-800 text-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        >
                            <option value="Inquiry">Inquiry</option>
                            <option value="Loan">Loan</option>

                            {/* Add more options if needed */}
                        </select>
                        {/* Download and Upload Section */}
                        {formData.inquiryType === "Loan" && (
                            <div className="mt-10 container mx-auto">
                                {/* Download Section */}
                                <div className="mb-6">
                                    <h4 className="text-xl font-bold text-white mb-2">Download Form</h4>
                                    <a
                                        href="./templates.pdf"
                                        download
                                        className="bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded"
                                    >
                                        Download Application Form
                                    </a>
                                </div>

                                {/* Upload Section */}
                                <div>
                                    <h4 className="text-xl font-bold text-white mb-2">Upload Completed Form</h4>
                                    <input
                                        type="file"
                                        onChange={handleFileUpload}
                                        className="block w-full text-gray-200 bg-gray-800 border border-gray-600 rounded-lg p-2"
                                    />
                                    {uploadedFile && (
                                        <p className="mt-2 text-sm text-gray-400">
                                            File uploaded: {uploadedFile.name}
                                        </p>
                                    )}
                                </div>
                            </div>
                        )}
                        <textarea
                            name="message"
                            placeholder="Your Message"
                            value={formData.message}
                            onChange={handleInputChange}
                            required
                            className="w-full p-3 bg-gray-800 text-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 h-32"
                        ></textarea>
                        <button
                            type="submit"
                            className="w-full bg-indigo-600 hover:bg-indigo-700 text-white p-3 rounded-lg transition"
                        >
                            Send Message
                        </button>
                    </form>
                </div>
            </div>



            <div className="border-t border-gray-700 mt-12">
                <p className="text-center py-4 text-gray-500">
                    Copyright © 2024 Pangwa Capital. All Rights Reserved.
                </p>
            </div>
        </div>
    );
}

export default Footer;
