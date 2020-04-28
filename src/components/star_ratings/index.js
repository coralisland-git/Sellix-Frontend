import React from 'react'
import ReactStarsRating from 'react-awesome-stars-rating';


const starSvg = `
    <svg xmlns="http://www.w3.org/2000/svg" width="20" viewBox="0 -10 511.98685 511" width="512px"><g><path d="m510.652344 185.902344c-3.351563-10.367188-12.546875-17.730469-23.425782-18.710938l-147.773437-13.417968-58.433594-136.769532c-4.308593-10.023437-14.121093-16.511718-25.023437-16.511718s-20.714844 6.488281-25.023438 16.535156l-58.433594 136.746094-147.796874 13.417968c-10.859376 1.003906-20.03125 8.34375-23.402344 18.710938-3.371094 10.367187-.257813 21.738281 7.957031 28.90625l111.699219 97.960937-32.9375 145.089844c-2.410156 10.667969 1.730468 21.695313 10.582031 28.09375 4.757813 3.4375 10.324219 5.1875 15.9375 5.1875 4.839844 0 9.640625-1.304687 13.949219-3.882813l127.46875-76.183593 127.421875 76.183593c9.324219 5.609376 21.078125 5.097657 29.910156-1.304687 8.855469-6.417969 12.992187-17.449219 10.582031-28.09375l-32.9375-145.089844 111.699219-97.941406c8.214844-7.1875 11.351563-18.539063 7.980469-28.925781zm0 0" fill="#613BEA" data-original="#FFC107" class="active-path" data-old_color="#ffc107"/></g> </svg>
`

const emptyStarSvg = `
    <svg xmlns="http://www.w3.org/2000/svg" width="20" viewBox="0 -10 511.98685 511" width="512px" class=""><g><path d="m510.652344 185.902344c-3.351563-10.367188-12.546875-17.730469-23.425782-18.710938l-147.773437-13.417968-58.433594-136.769532c-4.308593-10.023437-14.121093-16.511718-25.023437-16.511718s-20.714844 6.488281-25.023438 16.535156l-58.433594 136.746094-147.796874 13.417968c-10.859376 1.003906-20.03125 8.34375-23.402344 18.710938-3.371094 10.367187-.257813 21.738281 7.957031 28.90625l111.699219 97.960937-32.9375 145.089844c-2.410156 10.667969 1.730468 21.695313 10.582031 28.09375 4.757813 3.4375 10.324219 5.1875 15.9375 5.1875 4.839844 0 9.640625-1.304687 13.949219-3.882813l127.46875-76.183593 127.421875 76.183593c9.324219 5.609376 21.078125 5.097657 29.910156-1.304687 8.855469-6.417969 12.992187-17.449219 10.582031-28.09375l-32.9375-145.089844 111.699219-97.941406c8.214844-7.1875 11.351563-18.539063 7.980469-28.925781zm0 0" fill="#CCAAE6" data-original="#FFC107" class="active-path" data-old_color="#ffc107"/></g> </svg>
`

export class StarRating extends React.Component {

    constructor(props) {
        super(props)

        this.ref = React.createRef();
    }

    refreshUi = () => {
        const { value } = this.props
        if(this.ref) {

            var i = 0;

            this.stars = this.ref.current.querySelectorAll('.star')
            
            for(const star of this.stars) {
                star.innerHTML = starSvg + emptyStarSvg
                if(i < value) {
                    star.children[0].style.display = 'inline'
                    star.children[1].style.display = 'none'
                } else {
                    star.children[0].style.display = 'none'
                    star.children[1].style.display = 'inline'
                }
                const iCopy = i

                if(this.props.isEdit !== false) {
                    star.onclick = () => this.props.onChange(iCopy+1)
                    star.onmouseover = () => {
                        for(var j = 0; j < this.stars.length; j++) {
                            if(j <= iCopy) {
                                this.stars[j].children[0].style.display = 'inline'
                                this.stars[j].children[1].style.display = 'none'
                            } else {
                                this.stars[j].children[0].style.display = 'none'
                                this.stars[j].children[1].style.display = 'inline'
                            }
                        }
                    }
                    star.onmouseout = () => {
                        for(var j = 0; j < this.stars.length; j++) {
                            if(j < value) {
                                this.stars[j].children[0].style.display = 'inline'
                                this.stars[j].children[1].style.display = 'none'
                            } else {
                                this.stars[j].children[0].style.display = 'none'
                                this.stars[j].children[1].style.display = 'inline'
                            }
                        }
                    }
                }
                i++;
            }

            this.ref.current.querySelector('span[role=button]').background = 'transparent !important'
        }
    }

    componentDidMount() {
        this.refreshUi()
    }

    componentDidUpdate() {
        this.refreshUi()
    }

    render() {
        return <div ref={this.ref} style={{
            marginLeft: '5px'
        }} className="star-rating-container">
            <ReactStarsRating {...this.props} className={"transparent-bg " + this.props.className}/>
        </div>
    }
}