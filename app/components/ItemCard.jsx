import Link from "next/link";
import Image from "next/image";
import { FaDollarSign } from "react-icons/fa";

export default function ItemCard({ product }) {
  const { _id, title, shortDesc, price, imageUrl } = product;

  return (
    <div className="card w-full bg-base-100 shadow-xl transition-all duration-300 hover:shadow-2xl hover:scale-[1.02] focus-within:shadow-2xl focus-within:scale-[1.02]">
      <figure className="aspect-video relative overflow-hidden bg-base-200">
        <img
          src={imageUrl}
          alt={title}
          className="object-cover w-full h-full absolute top-0 left-0"
        />
      </figure>

      <div className="card-body p-4">
        <h2 className="card-title text-lg line-clamp-1">{title}</h2>
        <p className="text-sm text-gray-500 line-clamp-2 min-h-[40px]">
          {shortDesc}
        </p>

        <div className="flex justify-between items-center mt-2">
          <span className="text-2xl font-bold text-primary flex items-center">
            <FaDollarSign className="text-xl" /> {price || "N/A"}
          </span>
          <Link
            href={`/products/${_id}`}
            className="btn btn-sm btn-outline btn-primary"
          >
            Details
          </Link>
        </div>
      </div>
    </div>
  );
}
