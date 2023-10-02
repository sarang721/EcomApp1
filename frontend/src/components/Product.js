import React from 'react'
import { Card } from 'react-bootstrap'
import Rating from './Rating'
import { Link } from 'react-router-dom'

const Product = (props) => {
    return (
        <Card className='my-3 py-3 rounded'>

            <Link to={`/products/${props.product._id}`}>
            <Card.Img className='imagesize' src={props.product.image} variant='top' ></Card.Img>
            </Link>


            <Card.Body>
            <Link to={`/products/${props.product._id}`}>
            <Card.Title as="div">
                <strong>{props.product.name}</strong>
            </Card.Title>
            </Link>

            </Card.Body>

            <Card.Text as="h3">
                <Rating value={props.product.rating} 
                text={`${props.product.numReviews} reviews`}
                ></Rating>
            </Card.Text>

            <Card.Text as="h3">
                Rs  { props.product.price}
            </Card.Text>

        </Card>
    )
}

export default Product
