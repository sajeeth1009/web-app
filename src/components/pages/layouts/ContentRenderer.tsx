import clsx from 'clsx';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { PageColumn, PageItem, PageRow } from '../../../types/config/pages';
import { getExternalOrLocalContentURL } from '../../../utils/routeUtils';
import ImageCard from '../../cards/ImageCard/ImageCard';
import TeaserImage from '../../displays/TeaserImage';
import MarkdownLoader from './MarkdownLoader';

interface ContentRendererProps {
    isAuthenticated: boolean;
    rows: Array<PageRow>;
    pageKey: string;
}

const ContentRenderer: React.FC<ContentRendererProps> = (props) => {
    const { t, i18n } = useTranslation([props.pageKey]);

    const renderItem = (item: PageItem) => {
        if (
            (item.hideWhen === 'auth' && props.isAuthenticated) ||
            (item.hideWhen === 'unauth' && !props.isAuthenticated)
        ) {
            return null;
        }
        switch (item.config.type) {
            case 'markdown':
                return <MarkdownLoader
                    key={item.itemKey}
                    className={item.className}
                    languageCode={i18n.language}
                    markdownUrl={item.config.markdownUrl}
                />
            case 'teaserImage':
                return <TeaserImage
                    key={item.itemKey}
                    image={item.config.image}
                    textBox={item.config.textBox ? {
                        className: item.config.textBox.className,
                        title: item.config.textBox.titleKey ? t(`${item.itemKey}.${item.config.textBox.titleKey}`) : undefined,
                        content: item.config.textBox.contentKey ? t(`${item.itemKey}.${item.config.textBox.contentKey}`) : undefined,
                    } : undefined}
                />
            case 'imageCard':
                const action = item.config.action;
                return <ImageCard
                    key={item.itemKey}
                    className={item.className}
                    imageSrc={item.config.imageSrc ? getExternalOrLocalContentURL(item.config.imageSrc) : undefined}
                    imageAlt={item.config.imageAltKey ? t(`${item.itemKey}.${item.config.imageAltKey}`) : undefined}
                    title={item.config.titleKey ? t(`${item.itemKey}.${item.config.titleKey}`) : undefined}
                    body={item.config.bodyKey ? t(`${item.itemKey}.${item.config.bodyKey}`) : undefined}
                    openActionText={item.config.actionTextKey ? t(`${item.itemKey}.${item.config.actionTextKey}`) : undefined}
                    onClick={() => {
                        console.log(action);
                    }}
                />
        }
        return <div
            key={item.itemKey}
            className={item.className}>
            {item.itemKey}
        </div>
    }

    const renderColumn = (col: PageColumn, index: number) => {
        return <div
            className={col.className}
            key={index.toFixed()}>
            {col.items.map(item => renderItem(item))}
        </div>
    }

    return (
        <React.Fragment>
            {props.rows.map((row, index) =>
                <div
                    key={index.toFixed()}
                    className={clsx(
                        {
                            "container": !row.fullWidth,
                            "container-fluid": row.fullWidth
                        },
                        row.className)}
                >
                    <div className="row">
                        {row.columns.map((col, index) => renderColumn(col, index))}
                    </div>
                </div>)}
        </React.Fragment>
    );
};

export default ContentRenderer;