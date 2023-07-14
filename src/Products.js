import React from "react";
import { Grid } from '@material-ui/core'
import {Card, CardMedia, CardContent, CardActions, Typography, IconButton} from '@material-ui/core'
import {AddShoppingCart} from '@material-ui/icons'
import useStyles from './styles'
import useStyle from './styleProducts'
//import images

const Products = ({products, onAddToCart}) => {
    const classes = useStyle()
    return (
        <main className={classes.content}>
            <div className={classes.toolbar}/>
            <Grid container justifyContent="center" spacing={4}>
                {products.map((product) => (
                    <Grid item key={product.id} xs={12} sm={6} md={4} lg={3}>
                        <Product product={product} onAddToCart={onAddToCart}/>
                    </Grid>
                ))}
            </Grid>
        </main>
    )
}

const Product = ({product, onAddToCart}) => {
    const classes = useStyles()
    return (
        <Card className={classes.root}>
            <CardMedia className={classes.media} image={product.image.url} title={product.name}/>
            <CardContent>
                <div className={classes.cardContent}>
                    <Typography variant="h5" gutterBottom>
                        {product.name}
                    </Typography>
                    <Typography variant="h5" gutterBottom>
                        {product.price.formatted_with_symbol}
                    </Typography>
                </div>
                <Typography dangerouslySetInnerHTML={{__html: product.description}} variant="body2" color="textSecondary" />
            </CardContent>
            <CardActions disableSpacing className={classes.cardActions}>
                <IconButton aria-label="Add to cart" onClick={() => 
                onAddToCart(product.id, 1)}>
                    <AddShoppingCart/>
                </IconButton>
            </CardActions>
        </Card>
    )
}



export default Products