import { Card, CloseButton, Text, ThemeIcon } from '@mantine/core';
import {
  IconAlertCircle,
  IconAlertTriangle,
  IconCheck,
  IconInfoCircle,
} from '@tabler/icons-react';
import { SnackbarContent, useSnackbar } from 'notistack';
import { forwardRef, useCallback } from 'react';

interface MessageProps {
  id: string;
  message: string;
  className: string;
  icon: React.ReactNode;
  bgColor: string;
  iconBgColor: string;
}

const MessageBase = forwardRef<HTMLDivElement, MessageProps>(
  ({ id, bgColor, iconBgColor, ...props }, ref) => {
    const { closeSnackbar } = useSnackbar();
    const handleDismiss = useCallback(() => {
      closeSnackbar(id);
    }, [id, closeSnackbar]);

    return (
      <SnackbarContent ref={ref}>
        <Card
          shadow="sm"
          p="sm"
          radius="md"
          style={{ backgroundColor: bgColor }}
          className={`snackbar ${props.className}`}
        >
          <div
            className="container"
            style={{ display: 'flex', alignItems: 'center' }}
          >
            <ThemeIcon
              size="md"
              radius="lg"
              style={{ backgroundColor: iconBgColor }}
            >
              {props.icon}
            </ThemeIcon>
            <Text size="sm" style={{ flex: 1, marginLeft: 8 }}>
              {props.message}
            </Text>
            <CloseButton onClick={handleDismiss} size="sm" />
          </div>
        </Card>
      </SnackbarContent>
    );
  },
);

MessageBase.displayName = 'MessageBase';

const SuccessMessage = forwardRef<HTMLDivElement, MessageProps>(
  (props, ref) => (
    <MessageBase
      {...props}
      ref={ref}
      className="success"
      icon={<IconCheck size={15} color="#A6FAAF" />}
      bgColor="#D3CEFF"
      iconBgColor="#221361"
    />
  ),
);
SuccessMessage.displayName = 'SuccessMessage';

const ErrorMessage = forwardRef<HTMLDivElement, MessageProps>((props, ref) => (
  <MessageBase
    {...props}
    ref={ref}
    className="error"
    icon={<IconAlertCircle size={15} color="#F67476" />}
    bgColor="#D3CEFF"
    iconBgColor="#221361"
  />
));
ErrorMessage.displayName = 'ErrorMessage';

const WarningMessage = forwardRef<HTMLDivElement, MessageProps>(
  (props, ref) => (
    <MessageBase
      {...props}
      ref={ref}
      className="warning"
      icon={<IconAlertTriangle size={15} color="#FFC75B" />}
      bgColor="#D3CEFF"
      iconBgColor="#221361"
    />
  ),
);
WarningMessage.displayName = 'WarningMessage';

const InfoMessage = forwardRef<HTMLDivElement, MessageProps>((props, ref) => (
  <MessageBase
    {...props}
    ref={ref}
    className="info"
    icon={<IconInfoCircle size={15} color="#C8D8FF" />}
    bgColor="#D3CEFF"
    iconBgColor="#221361"
  />
));
InfoMessage.displayName = 'InfoMessage';

export { ErrorMessage, InfoMessage, SuccessMessage, WarningMessage };
