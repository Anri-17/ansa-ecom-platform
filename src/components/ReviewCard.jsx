import React from 'react'

export default function ReviewCard({ review }) {
  return (
    <div className="card">
      <div className="flex items-center mb-4">
        <img 
          src={review.avatar} 
          alt={review.name}
          className="w-12 h-12 rounded-full object-cover mr-4"
        />
        <div>
          <h4 className="font-semibold text-text">{review.name}</h4>
          <div className="flex items-center space-x-1">
            {[...Array(5)].map((_, i) => (
              <svg
                key={i}
                className={`w-5 h-5 ${
                  i < review.rating ? 'text-yellow-400' : 'text-gray-300'
                }`}
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
            ))}
          </div>
        </div>
      </div>
      <p className="text-text-light">{review.comment}</p>
      {review.image && (
        <img
          src={review.image}
          alt="Review"
          className="mt-4 rounded-lg w-full h-48 object-cover"
        />
      )}
    </div>
  )
}
