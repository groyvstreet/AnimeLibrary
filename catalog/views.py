from django.shortcuts import redirect


def activate(request, uid, token):
    """View for activate  user and redirect to client activate page."""
    return redirect(f'http://localhost:3000/activation/{uid}/{token}')
