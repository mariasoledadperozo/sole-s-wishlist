import { useEffect, useId, useRef, useState } from "react";
import "@fontsource/libre-caslon-condensed/400.css";
import "@fontsource/libre-caslon-condensed/700.css";
import "./product.css";

export default function Product({ title = "Producto", description = "", image, images = [], options = [], isFree = false, price, children }) {
    const productImages = images.length > 0 ? images : image ? [image] : [];
    const [activeImageIndex, setActiveImageIndex] = useState(0);
    const [isHovered, setIsHovered] = useState(false);
    const [isOptionsOpen, setIsOptionsOpen] = useState(false);
    const optionsDialogRef = useRef(null);
    const optionsTitleId = useId();
    const firstHandOptions = options.filter((option) => option.condition === "New");
    const secondHandOptions = options.filter((option) => option.condition === "SecondHand");

    useEffect(() => {
        const dialog = optionsDialogRef.current;
        if (!dialog) return;

        if (isOptionsOpen && !dialog.open) dialog.showModal();
        if (!isOptionsOpen && dialog.open) dialog.close();
    }, [isOptionsOpen]);

    useEffect(() => {
        if (!isHovered || productImages.length < 2) return undefined;

        const intervalId = window.setInterval(() => {
            setActiveImageIndex((currentIndex) => (currentIndex + 1) % productImages.length);
        }, 1800);

        return () => window.clearInterval(intervalId);
    }, [isHovered, productImages.length]);

    function handleMouseEnter() {
        const canHover = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
        const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

        if (!canHover || prefersReducedMotion || productImages.length < 2) return;

        setActiveImageIndex((currentIndex) => (currentIndex + 1) % productImages.length);
        setIsHovered(true);
    }

    function handleMouseLeave() {
        if (!isHovered) return;

        setIsHovered(false);
        setActiveImageIndex(0);
    }

    function showPreviousImage() {
        setActiveImageIndex((currentIndex) => (currentIndex - 1 + productImages.length) % productImages.length);
    }

    function showNextImage() {
        setActiveImageIndex((currentIndex) => (currentIndex + 1) % productImages.length);
    }

    function renderOptionGroup(heading, groupOptions) {
        return (
            <section className="product-options-group">
                <h3>{heading}</h3>
                {groupOptions.length > 0 ? (
                    <div className="product-options-list">
                        {groupOptions.map((option, index) => {
                            const amount = option.price == null
                                ? "Precio pendiente"
                                : `${option.price} ${option.currency ?? ""}`.trim();
                            const label = option.buttonLabel ?? `Opción ${index + 1}: ${amount}`;
                            const hasDestination = typeof option.url === "string" && /^https?:\/\//i.test(option.url);

                            return hasDestination ? (
                                <a
                                    key={`${option.condition}-${index}`}
                                    className="product-option-button"
                                    href={option.url}
                                    target="_blank"
                                    rel="noreferrer"
                                >
                                    {label}
                                </a>
                            ) : (
                                <button
                                    key={`${option.condition}-${index}`}
                                    type="button"
                                    className="product-option-button"
                                    disabled
                                >
                                    {label}
                                </button>
                            );
                        })}
                    </div>
                ) : (
                    <p className="product-options-empty">No hay opciones disponibles.</p>
                )}
            </section>
        );
    }

    function handleDialogClick(event) {
        const bounds = event.currentTarget.getBoundingClientRect();
        const clickedOutside = event.clientX < bounds.left
            || event.clientX > bounds.right
            || event.clientY < bounds.top
            || event.clientY > bounds.bottom;

        if (clickedOutside) setIsOptionsOpen(false);
    }

    return (
        <article className="product-widget">
            {productImages.length > 0 && (
                <div
                    className="product-gallery"
                    onMouseEnter={handleMouseEnter}
                    onMouseLeave={handleMouseLeave}
                    role="group"
                    aria-label={`Fotos de ${title}`}
                >
                    {productImages.map((photo, index) => (
                        <img
                            key={photo}
                            src={photo}
                            alt={index === activeImageIndex ? title : ""}
                            aria-hidden={index !== activeImageIndex}
                            className={`img-product-list${index === activeImageIndex ? " is-active" : ""}`}
                        />
                    ))}
                    {productImages.length > 1 && (
                        <div className="product-gallery__controls">
                            <button type="button" onClick={showPreviousImage} aria-label={`Foto anterior de ${title}`}>
                                ‹
                            </button>
                            <button type="button" onClick={showNextImage} aria-label={`Siguiente foto de ${title}`}>
                                ›
                            </button>
                        </div>
                    )}
                </div>
            )}
            <section className="product-widget__content">
                <h2 className="product-title">{title}</h2>
                {description && <p className="product-description">{description}</p>}
                <article className="product-sub-div">
                    {children}
                    {price != null && <p className="product-price">{price}</p>}
                    <button className="product-button" onClick={() => setIsOptionsOpen(true)}>VER REGALO</button>
                </article>
            </section>
            <dialog
                ref={optionsDialogRef}
                className="product-options-dialog"
                aria-labelledby={optionsTitleId}
                onClose={() => setIsOptionsOpen(false)}
                onClick={handleDialogClick}
            >
                <header className="product-options-header">
                    <h2 id={optionsTitleId}>{title}</h2>
                    <button
                        type="button"
                        className="product-options-close"
                        onClick={() => setIsOptionsOpen(false)}
                        aria-label="Cerrar opciones"
                    >
                        ×
                    </button>
                </header>
                {isFree ? (
                    <p className="product-free-message" aria-label="Gratis, sonrisa">
                        :)
                    </p>
                ) : (
                    <>
                        {renderOptionGroup("Opciones de primera mano", firstHandOptions)}
                        {renderOptionGroup("Opciones de segunda mano", secondHandOptions)}
                    </>
                )}
            </dialog>
        </article>
    );
}
