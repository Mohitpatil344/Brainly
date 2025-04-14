import random

def random_string(length):
    options = "qwertyuioasdfghjklzxcvbnm12345678"
    return ''.join(random.choice(options) for _ in range(length))
