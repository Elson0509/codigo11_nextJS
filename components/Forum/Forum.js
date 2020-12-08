import { useEffect, useState, Fragment } from 'react'
import axios from '../../util/axios-base'
import Spinner from '../Loading/Spinner'
import Post from './Post'
import PostEditor from './PostEditor'
import { userId } from '../../util/UserFunctions'
import Pagination from '../Pagination/Pagination'
import { ToastContainer, toast } from 'react-toastify';
import classes from './Forum.module.css'

const Forum = (props) => {
    const [page, setPage] = useState()
    const [lastPage, setLastPage] = useState()
    const [spinner, setSpinner] = useState(true)
    const [posts, setPosts] = useState()
    const [comment, setComment] = useState('')
    const [errorMessage, setErrorMessage] = useState('')

    const changePageHandler = (page) => {
        if(!isNaN(page)){
            setPage(page)
        }
    }

    const commentChangedHandler = (ev) => {
        if(ev.target.value.length <= 1000)
            setComment(ev.target.value)
    }

    const configToast = {
        position: "bottom-center",
        autoClose: 4000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
    }

    const postarHandler = () => {
        setSpinner(true)
        setErrorMessage('')
        const id = userId();
        if(!id){
            setSpinner(false)
            toast.error(`Você precisa estar logado para participar do fórum.`, configToast);
            return
        }
        if(!comment){
            setSpinner(false)
            setErrorMessage('Você não pode comentar algo vazio.')
            return
        }
        if(comment.length > 1000){
            setSpinner(false)
            setErrorMessage('Esse comentário está muito grande.')
            return
        }

        if(id){
            axios.post('/posts/insert', {
                id,
                fii: props.fii,
                secao: props.secao,
                comment,
                token: localStorage.userToken
            })
            .then(res => {
                setSpinner(false)
                toast.success(`Comentário postado!`, configToast);
                setComment('')
                fetchLastPosts()
            })
            .catch(err=> {
                setSpinner(false)
                setErrorMessage('Algo deu errado.')
            })
        }
    }   

    const fetchPosts = () => {
        setSpinner(true)
        const path = `/posts/${props.fii}/${props.secao}/${page}`
        axios.get(path)
            .then(res => {
                setSpinner(false)
                setPosts(res.data.posts.data)
                setPage(res.data.posts.page)
                setLastPage(res.data.posts.lastPage)
            })
    }

    const fetchLastPosts = () => {
        setSpinner(true)
        const path = `/posts/${props.fii}/${props.secao}/last`
        axios.get(path)
            .then(res => {
                setSpinner(false)
                setPosts(res.data.posts.data)
                setPage(res.data.posts.page)
                setLastPage(res.data.posts.lastPage)
            })
            .catch(err=> {
                setSpinner(false)
                
            })
    }

    useEffect(() => {
        if(!page)
            fetchLastPosts()
        else
            fetchPosts()
    },[page])


    return (
        <div>
            <ToastContainer/>
            {posts && posts.length > 0 &&
                <Fragment>
                    {lastPage>1 && <Pagination page={page} lastPage={lastPage} change={changePageHandler}/>}
                    {posts.map(post => (
                        <Post post={post} key={post.id} user={post.user}/>
                    ))}
                </Fragment>
                }
            {posts && posts.length == 0 &&
                <Fragment>
                    <h4 className={classes.No_post}>Ainda não foram criados posts. Seja o primeiro!</h4>
                </Fragment>
                }
                {spinner && <Spinner/>}
                {lastPage>1 && <Pagination page={page} lastPage={lastPage} change={changePageHandler}/>}
                <PostEditor 
                    comment={comment} 
                    changed={commentChangedHandler} 
                    postar={postarHandler}/>
                {errorMessage && <div className="alert alert-danger" role="alert">
                    {errorMessage}
                </div>}
        </div>
    );
};

export default Forum;