
const showModal = ({open, form}) =>{

    return(<>
        <article className="modalMostrar" onClick={open}>

            <main className="containerModal" onClick={(e) => e.stopPropagation()} >
            {form}
            </main>

        </article>
    </>)
}

export default showModal