import { Text } from '@chakra-ui/react';
import Link, { LinkProps } from 'next/link';
import { useRouter } from 'next/router';
import { FC, ReactNode } from 'react';

type ActiveLinkType = LinkProps & { children: ReactNode };

const ActiveLink: FC<ActiveLinkType> = ({ children, href, ...otherProps }) => {
    const router = useRouter();

    const variant = router.route === href ? 'gradient-main' : 'link';

    return (
        <Link href={href} {...otherProps}>
            <Text variant={variant} as="div" fontSize="2xl">
                {children}
            </Text>
        </Link>
    );
};

export default ActiveLink;
