import React, {memo} from 'react';
import { VerticalTimeline, VerticalTimelineElement }  from 'react-vertical-timeline-component';
import 'react-vertical-timeline-component/style.min.css';
import Icon from '../Icon/Icon'
import ListOperation from '../Lists/ListOperation/ListOperation'

const TimelineOperations = (props) => {

    const getVerticalTimelineElement = (op, ind) => {
        const colorBg = op.operacao ? 'rgb(33, 150, 243)' : 'rgb(200, 20, 36)'
        const iconTimeline = op.operacao ?  'plus-square' : 'minus-square'

        return (
            <VerticalTimelineElement
                key={`op${ind}`}
                className="vertical-timeline-element--work"
                date={op.data_ref}
                iconStyle={{ background: colorBg, color: '#fff', fontSize: '30px', padding: '30px'}}
                icon={<Icon icon={iconTimeline}/>}
            >
                <ListOperation operacao={op}/>
                
            </VerticalTimelineElement>
        )
    }

    return (
        <VerticalTimeline>
            {
                props.operacoes.map((op, ind) => getVerticalTimelineElement(op, ind))
            }
            <VerticalTimelineElement
                iconStyle={{ background: 'rgb(16, 204, 82)', color: '#fff' }}
                
            />
        </VerticalTimeline>
    );
};

export default memo(TimelineOperations);