import MessageDialog from "../messageDialog";


const DeleteProduct = (props: any) => {

    return (
        <>
            <MessageDialog
                heading={"Remove Item"}
                cancelText={'Cancel'}
                okText={'Remove'}
                open={props.open}
                onOk={() => props.deleteItem()}
                handleClose={() => props.handleClose()}
                message={'Are you sure you want to remove this item?'}
            />
        </>
    )
}


export default DeleteProduct