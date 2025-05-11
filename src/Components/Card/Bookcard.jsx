import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import { FaRegHeart, FaHeart } from "react-icons/fa";
import { CiShoppingCart } from "react-icons/ci";
import Rating from "@mui/material/Rating";
import StarIcon from "@mui/icons-material/Star";
import bookImage from "./book.jpg";
import { useDispatch, useSelector } from 'react-redux';
import { addToCart } from '../../store/slices/cartSlice';
import { addToWishlist, removeFromWishlist } from '../../store/slices/wishlistSlice';
import { toast } from "react-toastify";

function Bookcard({ book }) {
  const dispatch = useDispatch();
  const wishlistItems = useSelector(state => state.wishlist.items);
  const isWishlisted = wishlistItems.some(item => item.id === book?.id);

  const handleWishlistClick = () => {
    if (isWishlisted) {
      dispatch(removeFromWishlist(book.id));
    } else {
      dispatch(addToWishlist(book));
    }
  };

  const handleAddToCart = () => {
    dispatch(addToCart(book));
    toast.success("Book added to cart!", {
      position: "bottom-right",
      autoClose: 2000,
    });
  };

  return (
    <Card style={{ width: "18rem" }}>
      <div className="position-relative">
        <Card.Img 
          variant="top" 
          src={book?.image || bookImage} 
          style={{ height: "200px", objectFit: "cover" }}
        />
        <button 
          className="btn position-absolute top-0 end-0 m-2 bg-white p-2 border-0"
          onClick={handleWishlistClick}
        >
          {isWishlisted ? (
            <FaHeart className="text-danger" />
          ) : (
            <FaRegHeart className="text-secondary" />
          )}
        </button>
      </div>
      <Card.Body>
        <Card.Title>{book?.title || "Muna Madan"}</Card.Title>

        <div className="d-flex align-items-center mb-2">
          <Rating
            name="text-feedback"
            value={book?.rating || 3}
            readOnly
            precision={0.5}
            size="small"
            emptyIcon={
              <StarIcon style={{ opacity: 0.55 }} fontSize="inherit" />
            }
          />
          <span className="ms-2 text-muted small">({book?.reviews || 24})</span>
        </div>

        <div className="mb-3">
          <span className="fw-bold fs-5 text-primary me-2">
            Rs {book?.price || 450}
          </span>
          <span className="text-muted text-decoration-line-through">
            Rs {book?.originalPrice || 600}
          </span>
        </div>

        <div className="d-flex justify-content-between align-items-center mt-auto">
          <span className="badge bg-success">{book?.stock || "IN STOCK"}</span>
          <button 
            className="btn btn-outline-primary"
            onClick={handleAddToCart}
          >
            <CiShoppingCart size={20} />
          </button>
        </div>
      </Card.Body>
    </Card>
  );
}

export default Bookcard;
