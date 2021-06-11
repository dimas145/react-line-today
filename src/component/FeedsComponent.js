import React, { useState, useEffect } from "react"
import { useParams } from "react-router-dom";
import CardComponent from "./CardComponent";

var cardProps = [];

export default function FeedsComponent(props) {
    const [cards, setCards] = useState([]);
    let { name } = useParams();

    const feeds = props.feeds.find((item) => {
        return item.name === name;
    }).templates;

    console.log("feeds");
    console.log(feeds);

    // filter feeds
    useEffect(() => {
        cardProps = [];
        for (var i = 0; i < feeds.length; i++) {
            if (feeds[i].hasOwnProperty("sections")) {
                if (feeds[i].sections[0].articles.length !== 0) {
                    var articles = feeds[i].sections[0].articles;
                    for (var j = 0; j < articles.length; j++) {
                        if (articles[j].hasOwnProperty("thumbnail") && articles[j].hasOwnProperty("title") && articles[j].hasOwnProperty("publisher") && articles[j].hasOwnProperty("url")) {
                            cardProps.push({
                                img: "https://obs.line-scdn.net/" + articles[j].thumbnail.hash,
                                title: articles[j].title,
                                publisher: articles[j].publisher,
                                url: articles[j].url.url,
                            });
                        }
                    }
                }
            }
        }
        setCards(cardProps);
    }, [feeds]);

    if (!cards.length) return (<span>loading...</span>);

    return (
        <div className="feeds_component">
            {cards.map((props) => (
                <CardComponent
                    img={props.img}
                    title={props.title}
                    publisher={props.publisher}
                    url={props.url}
                />
            ))}
        </div>
    )
}
