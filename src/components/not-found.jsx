import React, { useEffect } from "react";
import Parallax from "parallax-js";
import "../styles/NotFound.scss";
import { useNavigate } from "react-router-dom";

const NotFound = () => {
    useEffect(() => {
        const scene = document.getElementById("scene");
        if (scene) {
            const parallax = new Parallax(scene);
            return () => parallax.disable(); // cleanup
        }
    }, []);
    const navigate = useNavigate();
    return (
        <div className="notfound-page">
            {/* === About / Social Icons === */}
            <div className="about">
                <a
                    className="bg_links social portfolio"
                    href="https://www.rafaelalucas.com"
                    target="_blank"
                    rel="noreferrer"
                >
                    <span className="icon"></span>
                </a>
                <a
                    className="bg_links social dribbble"
                    href="https://dribbble.com/rafaelalucas"
                    target="_blank"
                    rel="noreferrer"
                >
                    <span className="icon"></span>
                </a>
                <a
                    className="bg_links social linkedin"
                    href="https://www.linkedin.com/in/rafaelalucas/"
                    target="_blank"
                    rel="noreferrer"
                >
                    <span className="icon"></span>
                </a>
                <a className="bg_links logo" href="#"></a>
            </div>

            {/* === Wrapper Section === */}
            <section className="wrapper">
                <div className="container">
                    {/* Parallax Scene */}
                    <div id="scene" className="scene" data-hover-only="false">
                        <div className="circle" data-depth="1.2"></div>

                        <div className="one" data-depth="0.9">
                            <div className="content">
                                <span className="piece"></span>
                                <span className="piece"></span>
                                <span className="piece"></span>
                            </div>
                        </div>

                        <div className="two" data-depth="0.6">
                            <div className="content">
                                <span className="piece"></span>
                                <span className="piece"></span>
                                <span className="piece"></span>
                            </div>
                        </div>

                        <div className="three" data-depth="0.4">
                            <div className="content">
                                <span className="piece"></span>
                                <span className="piece"></span>
                                <span className="piece"></span>
                            </div>
                        </div>

                        <p className="p404" data-depth="0.5">
                            404
                        </p>
                        <p className="p404" data-depth="0.1">
                            404
                        </p>
                    </div>

                    {/* Text & Button */}
                    <div className="text">
                        <article>
                                <p>
                                    Wah, sepertinya kamu tersesat! <br />
                                    Kembali ke halaman sebelumnya!
                                </p>
                            <button onClick={() => navigate(-1)}>
                                Kembali!
                            </button>
                        </article>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default NotFound;
