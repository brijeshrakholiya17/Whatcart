import { Star } from "lucide-react";

export default function ReviewsSection({ reviews }) {
    if (!reviews || !Array.isArray(reviews) || reviews.length === 0) {
        return null;
    }

    return (
        <div className="mt-10 pt-8 border-t border-gray-200">
            <h2 className="text-xl font-bold text-gray-900 mb-6">
                Customer Reviews ({reviews.length})
            </h2>
            <div className="space-y-4">
                {reviews.map((review) => (
                    <div
                        key={review.id}
                        className="bg-white rounded-lg p-4 border border-gray-100 shadow-sm"
                    >
                        <div className="flex items-center justify-between mb-2 flex-wrap gap-2">
                            <span className="font-semibold text-gray-900 text-sm">
                                {review.reviewerName}
                            </span>
                            <span className="text-xs text-gray-400 font-medium">
                                {review.date}
                            </span>
                        </div>
                        <div className="flex items-center gap-0.5 mb-2">
                            {[1, 2, 3, 4, 5].map((star) => (
                                <Star
                                    key={star}
                                    className={`w-3.5 h-3.5 ${
                                        star <= Math.round(review.rating)
                                            ? "fill-brand text-brand"
                                            : "text-gray-300"
                                    }`}
                                />
                            ))}
                        </div>
                        <p className="text-sm text-gray-600 leading-relaxed">
                            {review.comment}
                        </p>
                    </div>
                ))}
            </div>
        </div>
    );
}
