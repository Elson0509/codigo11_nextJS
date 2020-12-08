import classes from './Forum.module.css'

const PostEditor = (props) => {
    return (
        <div className={`panel ${classes.Post_editor} ${props.typePanel || 'panel-default'}`}>
            <div className={classes.Panel_body}>
                <textarea 
                    className={`form-control ${classes.Post_editor_input}`} 
                    rows="8" 
                    value={props.comment} 
                    placeholder="Comente aqui :)"
                    onChange={props.changed}
                />
                <div className={classes.Div_editor}>
                    <span>{1000 - props.comment.length} / 1000</span>
                    <button className={`btn btn-success ${classes.Post_editor_button}`} onClick={props.postar}>Postar</button>
                </div>
            </div>
        </div>
    );
};

export default PostEditor;