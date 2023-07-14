import {makeStyles} from '@material-ui/core/styles'

export default makeStyles((theme) =>({
    root: {
        maxWidth : '100%',
        maxHeight : '400px',
        boxShadow : '0px 5px 10px 0px rgba(0, 0, 0, 0.5)',
        '&:hover' : {
            boxShadow : 'none',
        },
        borderRadius : '30px',
        transition : '300ms ease-in',
    },
    media: {
        height: 0,
        paddingTop: '52%',
        paddingBottom : '2%',
    },
    cardActions: {
        display: 'flex',
        justifyContent: 'flex-end',
    },
    cardContent: {
        display: 'flex',
        justifyContent: 'space-between',
    },
}))