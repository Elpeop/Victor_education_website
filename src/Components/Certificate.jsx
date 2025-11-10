import React from 'react';

export default function Certificate({ certificate }) {
  return (
    <div className="max-w-3xl mx-auto bg-white p-8 rounded-lg shadow">
      <div className="border-8 border-double p-8 text-center">
        <h1 className="text-4xl font-serif mb-6">Certificate of Completion</h1>
        
        <p className="text-xl mb-8">This certifies that</p>
        <p className="text-2xl font-bold mb-8">{certificate.studentName}</p>
        
        <p className="text-xl mb-8">has successfully completed</p>
        <p className="text-2xl font-bold mb-8">{certificate.courseName}</p>
        
        <div className="mt-16 flex justify-between items-center">
          <div className="text-center">
            <div className="mb-2">{new Date(certificate.dateIssued).toLocaleDateString()}</div>
            <div className="text-gray-500">Date</div>
          </div>
          
          <div className="text-center">
            <div className="mb-2 font-serif">{certificate.instructorName}</div>
            <div className="text-gray-500">Instructor</div>
          </div>
        </div>

        <div className="mt-8 text-sm text-gray-500">
          Certificate ID: {certificate.id}
        </div>
      </div>
    </div>
  );
}