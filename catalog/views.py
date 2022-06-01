from django.shortcuts import redirect
import logging


logger = logging.getLogger(__name__)


def activate(request, uid, token):
    """View for activate  user and redirect to client activate page."""
    logger.info('REDIRECT TO ACTIVATION PAGE')
    return redirect(f'http://localhost:3000/activation/{uid}/{token}')
